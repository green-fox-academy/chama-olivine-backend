const { Equipment } = require('../models/equipment');

class EquipmentService {
  constructor(conn) {
    this.conn = conn;
  }

  equipmentById(id) {
    const query = 'SELECT * FROM equipment WHERE id = ?;';
    return new Promise((resolve, reject) => {
      this.conn.query(query, [id], (err, row) => {
        if (err) {
          reject(new Error(500));
          return;
        }
        row.length > 0 ? resolve(row[0]) : reject(new Error(400));
      });
    });
  }

  checkIfActiveExists(type, heroId, itemId) {
    const query = 'SELECT * FROM equipment WHERE heroId = ? AND type = ? AND active = 1;';

    return new Promise((resolve, reject) => {
      this.conn.query(query, [heroId, type], (err, row) => {
        err ? reject(new Error(500)) : resolve(row[0]);
      });
    }).then((res) => {
      if (res) {
        if (res.id !== itemId) {
          this.changeActive(0, res.id);
          res.active = 0;
          delete res.heroId;
          return res;
        }
        return new Error(400);
      }
      return new Error(418);
    });
  }

  changeActive(changeTo, id) {
    const query = 'UPDATE equipment SET active = ? WHERE id = ?;';
    return new Promise((resolve, reject) => {
      this.conn.query(query, [changeTo, id], (err, row) => {
        err ? reject(new Error(500)) : resolve(row);
      });
    });
  }

  async equip(item) {
    const result = {
      changed: [],
      added: [],
      removed: [],
    };

    const equipmentToChange = await this.equipmentById(item.id);

    if (equipmentToChange instanceof Object && equipmentToChange.id) {
      const unequipPreviouslyEquipped = await this.checkIfActiveExists(equipmentToChange.type, equipmentToChange.heroId, item.id);
      if (!(unequipPreviouslyEquipped instanceof Error)) result.changed.push(unequipPreviouslyEquipped);

      const equipItem = await this.changeActive(1, item.id);
      if (!(equipItem instanceof Error)) {
        equipmentToChange.active = 1;
        delete equipmentToChange.heroId;
        result.changed.push(equipmentToChange);
      }
    }
    return result;
  }

  async use(item) {
    return new Promise((resolve, reject) => {
      if (item.actionType === 'equip') {
        resolve(this.equip(item));
        return;
      }
      reject(new Error(400));
    });
  }

  equipmentData(equipmentId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM equipment JOIN equipmentAttributes ON equipment.id = equipmentAttributes.equipmentId JOIN attributeModifier ON attributeModifier.id = equipmentAttributes.attributeId WHERE equipment.id = ?;' //eslint-disable-line

      this.conn.query(query, [equipmentId], async (err, row) => {
        if (err) return reject(new Error(500));
        const modifiers = await Promise.all(row.map(e => { //eslint-disable-line
          return { attributeName: e.attributeName, value: e.value, attributeId: e.id };
        }));

        return resolve(new Equipment(equipmentId, row[0].name, modifiers, row[0].type, row[0].active));
      });
    });
  }

  copyAttributes(equipmentModifier, equipmentId) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO equipmentAttributes(equipmentId, attributeId) VALUES(?,?);';
      this.conn.query(query, [equipmentId, equipmentModifier.attributeId], (err) => {
        if (err) return reject(new Error(500));
        return resolve('ok');
      });
    });
  }

  copyEquipment(equipment, heroId) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO equipment(name, type, active, heroId) VALUES(?,?,?,?);';
      this.conn.query(query, [equipment.name, equipment.type, 0, heroId], async (err, row) => {
        if (err) return reject(new Error(500));
        await Promise.all(equipment.modifiers.map(e => this.copyAttributes(e, Number(row.insertId))));

        return resolve({
          id: row.insertId,
          name: equipment.name,
          type: equipment.type,
          active: 0,
        });
      });
    });
  }
}

module.exports = EquipmentService;
