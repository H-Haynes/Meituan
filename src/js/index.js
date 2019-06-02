import "../css/main.less";
import "../css/detaile.less";
import {getData} from "../js/getData";
if(module.hot){
    module.hot.accept()
}
$(function(){
    let dataList;

    //获取商家数据列表
    getData("shopList").then(res=>{
        dataList=JSON.parse(res);
    },err=>{
        alert("拉取商家数据失败！")
    }).then(res=>{      //渲染商店列表
        randerShopList(dataList);
    })


})

function randerShopList(dataList){
    let $list=$(".list");

    if(dataList){
        dataList.forEach(ele => {
            let dom=`
            <li>
                <a href="./detail.html?id=${ele.shopId}">
                <img src="${ele.shopImg}" />
                <div class="shop-info">
                    <p class="shop-name">${ele.shopname}</p>
                    <p class="shop-des">${ele.shopdes}</p>
                    <p class="price">
                        <span class="nowPrice"><span class="nowPriceNum">${ele.nowPrice}</span>元</span>
                        <span class="originPrice">门市价:<span class="originPriceNum">${ele.originPrice}</span>元</span>
                    </p>
    
                    <span class="sale">已售:<span class="saleNum">${ele.saleNum}</span></span>
    
                </div>
            </a>
        </li>`;

        $list.append(dom);
        });
    }
}

