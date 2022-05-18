// models internal //
const inquirer = require('inquirer')
const chalk = require('chalk')
// models internal //


// modules internal
const fs = require('fs')
console.log("Starting accounts");

operations()



function operations() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: ["Create account", "Check Balance", "Depositary", "Take out", "Leave"]

    },

    ]).then(answer => {
        const action = answer['action']

        if (action === 'Create account') {
            createAccount()
        } else if (action === 'Depositary') {
            deposit()
        } else if (action === 'Check Balance') {
        } else if (action === 'Tacke out') {
        } else if (action === 'Leave') {
            console.log(chalk.bgBlue.black('Thanks for using our account!!! :D'))
            process.exit()
        }
    })
        .catch(err => console.log(err))
}

//create an account

function createAccount() {
    console.log(chalk.bgGreen.black('Congratulations on choosing our bank! :D'))
    console.log(chalk.blue('Se your account options below!'));
    buildAccount()
    return
}



function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Enter a name for yout account:'
        }
    ]).then(answer => {
        const accountName = (answer['accountName'])
        console.info(`User is: ${accountName}`)

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.yellow('Ops: This user already exists, chose another name!')
            )
            buildAccount()
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance":0}', function (err) {
            console.log(err)
        },
        )
        console.log(chalk.green('Congratulations you created your account!'))

        operations()

    })
        .catch(err => console.log(err))
}

//add an amount to user account

function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Whats is your account name?'
        }
    ])
        .then((answer) => {
            const accountName = answer['accountName']
            //verify  if account exists!

            if (!checkAccount(accountName)) {
                return deposit()
            }

            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'How much you want deposit?'
                },

            ]).then(answer => {

                const amount = answer['amount']
                // add an amount
                addAmount(accountName, amount)
                operations()

            }).catch(err => { err })

        })
        .catch(err => console.log(err))
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('This account does not exist, choose another name!'))
        return false
    }
    return true
}

function addAmount(accountName, amount) {

    const account = getAccount(accountName)

}


function getAccount(account) {
    const accountJSON = fs.readFileSync(`account/${accountName}.json`, {
        ecoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}