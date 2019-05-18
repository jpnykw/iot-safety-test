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
            detecting: document.getElementById('detecting'),
            modal: document.getElementById('pass-change')
        };

        const startButton = document.querySelector('#start-button')
        startButton.addEventListener('click', () => {
            pages.home.style.animation = 'toHide 500ms ease-in-out forwards';
            pages.scanning.style.animation = 'toShow 500ms ease-in-out forwards';
            detect();
        });

        const detect = () => {
            // {"hosts":["172.100.0.1","172.100.0.254","172.100.1.14","172.100.1.3","172.100.1.5","172.100.3.254"],"network":"172.100.0.0/22"}
            const json = {"hosts":["172.100.0.1","172.100.0.254","172.100.1.14","172.100.1.3","172.100.1.5","172.100.3.254"],"network":"172.100.0.0/22"};
            setTimeout(() => {
                const command = 'python3 ./portScan/device_scan.py';
                /*
                const result = spawnSync(command, { shell: true });
                const stdout = result.output[1].toString();
                const stderr = result.output[2].toString();
                const json = JSON.parse(stdout);
                */
                const json = {"hosts":["172.100.0.1","172.100.0.254","172.100.1.14","172.100.1.3","172.100.1.5","172.100.3.254"],"network":"172.100.0.0/22"};
                // pages.scanning.style.animation = 'toHide 500ms ease-in-out forwards';
                // pages.detecting.style.animation = 'toShow 500ms ease-in-out forwards';
                json.hosts.forEach(address => {
                    const div = document.createElement('div');

                    // address
                    const p = document.createElement('div');
                    p.innerText = address;
                    p.id = address;

                    const i = document.createElement('i');
                    const status = (Math.random() * 3) >> 0; // 状態

                    if (status == 0) {
                        i.classList.add('far', 'fa-clock'); // 判定中
                        div.title = '判定中';
                    } else if (status == 1) {
                        i.classList.add('fas', 'fa-check'); // 安全
                        div.title = 'パスワードは安全です';

                        i.style = `
                            background: #0beb8d;
                        `;
                    } else {
                        i.classList.add('fas', 'fa-times'); // 危険
                        div.title = 'パスワードが突破されました(๑•ૅㅁ•๑)ｳﾞｧﾈ';

                        i.style = `
                            background: #ff4d58;
                            margin-right: 0px;
                            padding: 4px 6px;
                        `;

                        // ここでパスワード変更するクリックイベントを登録する
                        div.addEventListener('click', () => {
                            pages.detecting.style.animation = 'toHide 500ms ease-in-out forwards';
                            pages.modal.style.animation = 'toShow 500ms ease-in-out forwards';
                        });
                    }

                    div.appendChild(p);
                    div.appendChild(i);
                    pages.detecting.appendChild(div);
                });


                // モーダルの開閉操作
                let isClose = false;
                const modalForm = pages.modal.getElementsByClassName('window')[0];
                modalForm.addEventListener('mouseenter', () => isClose = false );
                modalForm.addEventListener('mouseleave', () => isClose = true );

                pages.modal.addEventListener('click', () => {
                    alert('clicked');

                    if (isClose) {
                        alert('close');
                    }
                });
            }, 0);
        };

        // test
        detect();

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
