console.log('Success load dom.js');

const os = require('electron').remote.require('os');
const spawnSync = require('child_process').spawnSync;
let curHost = '';
let loginInfo = {};

(() => {
    const system = os.type().toString();
    console.log('Your OS is', system);

    onload = () => {
        const pages = {
            home: document.getElementById('home'),
            scanning: document.getElementById('scanning'),
            detecting: document.getElementById('detecting'),
            modal: document.getElementById('pass-change'),
            loading: document.getElementById('loading'),
            good: document.getElementById('good')
        };

        const startButton = document.getElementById('start-button');
        startButton.addEventListener('click', () => {
            pages.home.style.animation = 'toHide 500ms ease-in-out forwards';
            pages.scanning.style.animation = 'toShow 500ms ease-in-out forwards';
            pages.loading.style.animation = 'toShow 500ms ease-in-out forwards';
            detect();
        });

        const detect = () => {
            setTimeout(() => {
                const command = 'python3 ./python/device_scan.py';
                const result = spawnSync(command, { shell: true });
                const stdout = result.output[1].toString();
                const stderr = result.output[2].toString();
                const json = JSON.parse(stdout);

                pages.scanning.style.animation = 'toHide 500ms ease-in-out forwards';
                pages.loading.style.animation = 'toHide 500ms ease-in-out forwards';
                pages.detecting.style.animation = 'toShow 500ms ease-in-out forwards';

                json.hosts.forEach(address => {
                    const div = document.createElement('div');
                    div.id = 'addr-' + address.replace(/\./g, '-')

                    const p = document.createElement('div');
                    p.innerText = address;

                    const i = document.createElement('i');
                    i.classList.add('far', 'fa-clock');
                    i.id = 'addr-' + address.replace(/\./g, '-') + '-status'
                    div.title = '判定中';

                    div.appendChild(p);
                    div.appendChild(i);
                    pages.detecting.appendChild(div);
                });

                let isClose = false;
                const modalForm = pages.modal.getElementsByClassName('window')[0];
                modalForm.addEventListener('mouseenter', () => isClose = false );
                modalForm.addEventListener('mouseleave', () => isClose = true );

                pages.modal.addEventListener('click', () => {
                    if (isClose) {
                        pages.detecting.style.animationPlayState = 'paused';
                        pages.modal.style.animationPlayState = 'paused';

                        pages.detecting.style.animation = 'toShow 500ms ease-in-out forwards';
                        pages.modal.style.animation = 'toHide 500ms ease-in-out forwards';
                    }
                });

                const password = pages.modal.getElementsByTagName('input');
                pages.modal.getElementsByTagName('button')[0].addEventListener('click', () => {
                    console.log(curHost, loginInfo)
                    if (password[0].value == password[1].value && password[0].value.trim() != '') {
                        console.log('password is correct');

                        pages.detecting.style.animationPlayState = 'paused';
                        pages.modal.style.animationPlayState = 'paused';

                        pages.good.style.animation = 'toShow 500ms ease-in-out forwards';
                        pages.modal.style.animation = 'toHide 500ms ease-in-out forwards';

                        setTimeout(() => {
                            setTimeout(() => {
                                spawnSync(`python3 change.py ${curHost} ${loginInfo.user} ${loginInfo.pass} ${password[0].value}`)
                            }, 600);

                            pages.good.style.animationPlayState = 'paused';
                            pages.modal.style.animationPlayState = 'paused';

                            pages.good.style.animation = 'toHide 500ms ease-in-out forwards';
                            pages.detecting.style.animation = 'toShow 500ms ease-in-out forwards';
                        }, 200);
                    }
                });

                setTimeout(() => {
                    tryLogin(json);
                }, 100);
            }, 600);
        };

        const tryLogin = json => {
            console.log(json)
            const hosts = json.hosts;
            let js;
            for (const host of hosts) {
                const div = document.querySelector('#' + 'addr-' + host.replace(/\./g, '-'))
                const i = document.querySelector('#' + 'addr-' + host.replace(/\./g, '-') + '-status')
                try {
                    const command = `python3 login.py ${host}`;
                    const result = spawnSync(command, [], {shell: true});
                    console.log(result)
                    const stdout = result.output[1].toString();
                    const stderr = result.output[2].toString();
                    console.log(stdout);
                    console.log(stderr);
                    js = JSON.parse(stdout);
                    if (js.result === 'failed') {
                        i.classList.remove('far', 'fa-clock')
                        i.classList.add('fas', 'fa-check');
                        div.title = 'パスワードは安全です';

                        i.style = `
                            background: #0beb8d;
                        `;
                        div.addEventListener('click', () => {
                            curHost = host
                            loginInfo = js
                            pages.detecting.style.animation = 'toHide 500ms ease-in-out forwards';
                            pages.modal.style.animation = 'toShow 500ms ease-in-out forwards';
                        });
                    } else {
                        i.classList.remove('far', 'fa-clock')
                        i.classList.add('fas', 'fa-times');
                        div.title = 'パスワードが突破されました';

                        i.style = `
                            background: #ff4d58;
                            margin-right: 0px;
                            padding: 4px 6px;
                        `;

                        div.addEventListener('click', () => {
                            curHost = host
                            loginInfo = js
                            pages.detecting.style.animation = 'toHide 500ms ease-in-out forwards';
                            pages.modal.style.animation = 'toShow 500ms ease-in-out forwards';
                        });
                    }
                } catch (e) {
                    i.classList.remove('far', 'fa-clock')
                    i.classList.add('fas', 'fa-check');
                    div.title = 'パスワードは安全です';

                    i.style = `
                        background: #0beb8d;
                    `;
                    div.addEventListener('click', () => {
                        curHost = host
                        pages.detecting.style.animation = 'toHide 500ms ease-in-out forwards';
                        pages.modal.style.animation = 'toShow 500ms ease-in-out forwards';
                    });
                }
            }
        };
    };
})();
