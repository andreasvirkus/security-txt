const { Command, flags } = require('@oclif/command')
const exists = require('url-exists')

function DomainException(value) {
  this.message = 'Provided domain does not seem to exist or did not return a 200 HTTP status for our HEAD check'
  this.toString = () => value + this.message
}

class SecurityTxtCommand extends Command {

  async run() {
    const {flags} = this.parse(SecurityTxtCommand)
    const domain = flags.domain || 'https://example.com'
    this.log(`Validating security.txt of ${domain}`)

    exists(domain, (err, exists) => {
      if (err || !exists) throw new DomainException(err)

      this.log(`Domain ${domain} exists. Now snooping for security.txt`)

    })
  }
}

SecurityTxtCommand.description = `
Describe the command here
...
Extra documentation goes here
`

SecurityTxtCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  domain: flags.string({char: 'd', description: 'Domain to validate'}),
}

module.exports = SecurityTxtCommand
