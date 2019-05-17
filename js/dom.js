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
            home: document.getElementById('home')
        };

        buttons = [...document.getElementsByClassName('button')];
        buttons[0].addEventListener('click', () => {
            pages.home.style.animation = 'toHide 500ms ease-in-out forwards';
            setTimeout(() => {
                // 以下2行で一応device_scan.pyが実行できますが，うまく動作させることができません…
                const command = `${system.match(/Windows/) ? 'wsl' : ''} python3 ./portScan/device_scan.py`;
                const result = JSON.parse(spawnSync(command, {shell: true}).output[1].toString());

                // scanの戻り値をとりあえず出力
                console.log('port scan result:\n', result);
            }, 10);
        });

    };
})();