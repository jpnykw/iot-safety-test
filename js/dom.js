console.log('Success load dom.js');

const os = require('electron').remote.require('os');

// こいつでコマンドを実行できます. 例: execSync('ls');
// 戻り値はバイナリなので文字列を取り出す場合は.toString()を追加
const execSync = require('electron').remote.require('child_process').execSync;

(() => {
    const system = os.type().toString();
    console.log('Your OS is', system);

    onload = () => {
        const pages = {
            home: document.getElementById('home'),
            detecting: document.getElementById('detecting')
        };

        buttons = [...document.getElementsByClassName('button')];
        buttons[0].addEventListener('click', () => {
            pages.home.style.animation = 'toHide 500ms ease-in-out forwards';
            pages.detecting.style.animation = 'toShow 500ms ease-in-out forwards';
            detect();
        });


        const detect = () => {
            // {"hosts":["172.100.0.1","172.100.0.254","172.100.1.14","172.100.1.3","172.100.1.5","172.100.3.254"],"network":"172.100.0.0/22"}
            // const json = {"hosts":["172.100.0.1","172.100.0.254","172.100.1.14","172.100.1.3","172.100.1.5","172.100.3.254"],"network":"172.100.0.0/22"};
            const json = {"hosts":["172.100.0.1","172.100.0.254","172.100.1.14","172.100.1.3","172.100.1.5","172.100.3.254","test","hoge","foo","bar"],"network":"172.100.0.0/22"};

            // 表示のテスト
            json.hosts.map(address => {
                // address
                const p = document.createElement('p');
                p.innerText = address;
                pages.detecting.appendChild(p);
            });
        }
    };
})();
