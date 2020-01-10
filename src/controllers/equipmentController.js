class EquipmentController {
  constructor(equipmentService) {
    this.equipmentService = equipmentService;
    this.use = this.use.bind(this);
  }

  use(req, res) {
    this.equipmentService.use({
      id: req.body.id,
      actionType: req.body.actionType,
    })
      .then(data => res.status(200).json(data))
      .catch((err) => {
        const errorResponse = {
          400: 'Please enter a valid id and actionType',
          500: 'Unknown error, please try again later',
        };
        res.status(err.message).json(errorResponse[err.message]);
      });
  }
}

module.exports = EquipmentController;
