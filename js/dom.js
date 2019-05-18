console.log('Success load dom.js');

const os = require('electron').remote.require('os');

// こいつでコマンドを実行できます. 例: execSync('ls');
// 戻り値はバイナリなので文字列を取り出す場合は.toString()を追加
const spawnSync = require('child_process').spawnSync;

(() => {
    const system = os.type().toString();
    console.log('Your OS is', system);

    onload = () => {
        const pages = {
            home: document.getElementById('home'),
            scanning: document.getElementById('scanning'),
            detecting: document.getElementById('detecting')
        };

        const startButton = document.querySelector('#start-button')
        startButton.addEventListener('click', () => {
            pages.home.style.animation = 'toHide 500ms ease-in-out forwards';
            pages.scanning.style.animation = 'toShow 500ms ease-in-out forwards';
            detect();
        });


        const detect = () => {
            // {"hosts":["172.100.0.1","172.100.0.254","172.100.1.14","172.100.1.3","172.100.1.5","172.100.3.254"],"network":"172.100.0.0/22"}
            // const json = {"hosts":["172.100.0.1","172.100.0.254","172.100.1.14","172.100.1.3","172.100.1.5","172.100.3.254"],"network":"172.100.0.0/22"};
            setTimeout(() => {
                const command = `${system.match(/Windows/) ? 'wsl' : ''} python3 ./portScan/device_scan.py`;

                const result = spawnSync(command, {shell: true});
                console.log(result)
                const stdout = result.output[1].toString();
                const stderr = result.output[2].toString();
                console.log(stdout);
                console.log(stderr);
                const json = JSON.parse(stdout);
                pages.scanning.style.animation = 'toHide 500ms ease-in-out forwards';
                pages.detecting.style.animation = 'toShow 500ms ease-in-out forwards';
                json.hosts.map(address => {
                    // address
                    const p = document.createElement('p');
                    p.innerText = address;
                    p.id = address;
                    pages.detecting.appendChild(p);
                });
            })
        };

        const tryLogin = (json) => {
            const hosts = json.hosts;
            for (const host of hosts) {
                const command = `${system.match(/Windows/) ? 'wsl' : ''} python3 login.py ${hosts}`;
                const result = spawnSync(command);
                const stdout = result.output[1].toString();
                const stderr = result.output[2].toString();
                console.log(stdout);
                console.log(stderr);
                const json = JSON.parse(stdout);

            }
        };
    };
})();
