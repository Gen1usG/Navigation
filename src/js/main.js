let data = JSON.parse(localStorage.getItem('x')) || []

let render = function () {
    $('.item-list:not(.item-list-increase)').remove()
    data.forEach((el) => {
        $(`<li class='item-list'>
        <a href="${el.url}">
            <div class="item-list-icon">${el.icon || el.url[0]}</div>
            <div class="item-list-url">${el.url}</div>
        </a>
        </li>`).insertBefore('.item-list-increase')
    })
}

render()

$('.item-list-increase').on('click', function () {
    let newurl = prompt('请输入新增的网址')
    if (newurl && newurl.indexOf('https://') === 0) {
        let newitem = {
            icon: newurl[0],
            url: newurl
        }
        data.push(newitem)
        render()
        localStorage.setItem('x', JSON.stringify(data))
    } else {
        alert('请输入以https://开头的网址')
    }
})

