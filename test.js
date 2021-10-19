// const {exec} = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function test() {
    let demoin = "tempa" + ".steamrobot.me"
    try{
        let {stdout, stderr} = await exec(`ping -n 1 -i 1 ${demoin}`)
        console.log(stdout, stderr)
    } catch(e){
        console.log(e)
    }


}
