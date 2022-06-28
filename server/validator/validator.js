const { check, validationResult } = require('express-validator')

//validation
exports.resultsValidator = (req) => {
    const messages = []
    if (!validationResult(req).isEmpty()) {
      const errors = validationResult(req).array()
      for (const i of errors) {
        messages.push(i)
            }
        }
        return messages
  }
  exports.registerValidator
   = () => {
      return [
        check('name', 'This username must me 3+ characters long')
            .exists()
            .isLength({ min: 3 }),
        check('email', 'Email is not valid')
            .isEmail()
            .normalizeEmail()
    
        ]
    }