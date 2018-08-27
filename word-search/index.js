var searchWord = document.getElementById('search-p'),
    replaceWord = document.getElementById('replace-p'),
    searchBnt = document.getElementById('search'),
    replaceBnt = document.getElementById('replace'),
    resetBnt = document.getElementById('reset'),
    wordEl = document.getElementById('box-p'),
    originHtml = wordEl.innerHTML;


searchBnt.onclick = function () {
    if (searchWord.value === '') {
        alert('请输入查找的字符');
    } else {
        setStyle(searchWord.value, 'find');
    }
}

replaceBnt.onclick = function () {
    if (searchWord.value === '') {
        alert('请输入查找的字符');
    } else {
        setStyle(replaceWord.value, 'replace');
    }
}

resetBnt.onclick = function () {
    wordEl.innerHTML = originHtml;
    searchWord.value = '';
    replaceWord.value = '';
}

function setStyle(x, y) {
    var wordArr = [];
    var afterWord = '';
    var word = document.querySelectorAll('#box-p p');
    for (let i = 0; i < word.length; i++) {
        afterWord = '';
        wordArr = word[i].innerText.split(searchWord.value);
        for (let k = 0; k < wordArr.length; k++) {
            if (wordArr.length === 1) {
                afterWord = afterWord + wordArr[0];
                break;
            }

            if (k !== wordArr.length - 1) {
                wordArr[k] = wordArr[k] + "<span class=" + y + ">" + x + "</span>";
            }
            afterWord = afterWord + wordArr[k];
        }
        word[i].innerHTML = afterWord;
    }
}




