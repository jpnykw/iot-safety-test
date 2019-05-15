const os = require('os');

// こいつでコマンドを実行できます. 例: execSync('ls');
// 戻り値はバイナリなので文字列を取り出す場合は.toString()を追加
const execSync = require('child_process').execSync;

(() => {
    const system = os.type().toString();

    onload = () => {
        const pages = {
            home: document.getElementById('home')
        };

        buttons = [...document.getElementsByClassName('button')];
        buttons[0].addEventListener('click', () => pages.home.style.animation = 'toHide 500ms ease-in-out forwards');

        // コマンド実行のテスト用
        // console.log('lsコマンドの結果:\n', execSync('ls ./portScan').toString());

        // これで一応device_scan.pyが実行できます.
        const command = `${system.match(/Windows/) ? 'wsl' : ''} sudo python ./portScan/device_scan.py`;
        const result = execSync(command).toString();

        // const result = execSync('wsl sudo python ./portScan/device_scan.py').toString();
        console.log('port scan result:\n', result);
    };
})();