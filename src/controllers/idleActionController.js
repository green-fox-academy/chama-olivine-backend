class IdleActionController {
  constructor(idleActionService) {
    this.idleActionService = idleActionService;
    this.setIdleAction = this.setIdleAction.bind(this);
  }

  setIdleAction(req, res) {
    this.idleActionService.setIdleStatus(req.params.id, req.params.type)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.message).json(`This is you error: ${err.message}`));
  }
}

module.exports = IdleActionController;
