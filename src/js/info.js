import "../css/detaile.less";
import {getData} from "../js/getData";

let shopData;
$(function () {
    bindEvent();
    //获取url拼接的数据
    const shopId=window.location.search.split("=")[1];
    //获取商家信息
        getData(shopId).then(res=>{
            shopData=JSON.parse(res);
            console.log(shopData);
        },err=>{
            alert("拉取商家信息失败了")
        }).then(()=>{
            randerPage();

        })



    //设置图片轮播;
    let mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: true,
        pagination: {
            el: ".swiper-pagination"
        },
       
        })
});


function randerPage(){

    //设置轮播图
    randerBanner(shopData.goodsImg);
    $(".info .shop-name").text(shopData.shopName);    //店铺名称
    $(".info .shop-des").text(shopData.shopDes);      //店铺描述
    randerPrice();
    randerBaozhang();
    randerPingfen();
    randerTip();
    randerComment();
}

function randerBanner(imgList){
    let $bannerBox=$(".swiper-container");
    let dom="";
    imgList.forEach(ele=>{
        dom+=` <div class="swiper-slide"><img swiper-animate-effect="fadeInRightBig"
        src="${ele}" /></div>`;
    });
    $bannerBox.append(dom);
}

function randerPrice(){
    let $price=$(".price");
    let dom=`
    <p class="cost">
    <span class="nowPrice">${shopData.nowPrice}</span>
    <span class="originPrice">门市价:￥<span>${shopData.originPrice}</span></span>
</p>

<div class="buy">立即抢购</div>
    `;
    $price.html(dom);
}
function randerBaozhang(){
    let $baozhang=$(".baozhang");
    let dom="";
    shopData.baozhang.forEach(ele=>{
        let icon=ele.icon=="tui"?"tuiIcon":"userIcon";
        let color=ele.color||"";
        dom+=`
        <span>
        <i class="${icon}"></i>
        <em class="${color}">支持随时退款</em>
    </span>
        `
    })
    $baozhang.html(dom);
}
function randerPingfen(){
    let $pingfen=$(".pingfen");
    let star=$pingfen.find(".shop-star i");
    let star2=$(".stars i");

    let xingji=Math.round(shopData.star);
    $(".callMe").attr({
        href:"tel:"+shopData.shopInfo.shopTel
       });
    $(".atonement-down").html(`<span><i></i>${shopData.shopInfo.shopPosition}</span>`)
    $pingfen.find(".shop-name").text(shopData.shopInfo.shopPosName);
    for(let i=0;i<xingji;i++){
        star.eq(i).removeClass("unstar").addClass("star");
        star2.eq(i).removeClass("unstar").addClass("star");

    }
}
function randerTip(){
    let $box=$(".tips");
    let dom="";
    shopData.tip.forEach(ele=>{
        let tipInfo="";
        ele.tipContent.forEach(item=>{
            console.log(item)
            tipInfo+=`<p class='tip-info'>${item}</p>`
        });
        dom+=` <div class="tip-content">
            <p class="tip-title">${ele.tipname}</p>
            ${tipInfo}
            </div>`
    })
    $box.append(dom);
}
function randerComment(){
   
    $(".commentNum").text(shopData.commitNum);
    $(".score").text(shopData.star);
    let comment="";
    shopData.comment.forEach(ele=>{
        let starnum=ele.givestar;
        let commentImg="";
        let stars="";
        //用户评星
        for(let i=0;i<Math.round(starnum);i++){ //打星
            star+="<i class='star'></i>"
        }
        for(let i=0;i<5-Math.round(starnum);i++){   //补星
            start+="<i class='unstar'></i>"
        }

        //用户评图
        //评图大于4张则只显示4张
        let forNum=ele.commentImg.length>4?4:ele.commentImg.length;
        for(let i=0;i<forNum;i++){
            commentImg+=`
            <li><img src='${ele.commentImg[i]}'/></li>
        `
        }

        comment+=`
        <div class="comment">
        <div class="userInfo">
            <img src="${ele.peopleHeadImg}"/>
            <div class="giveStar">
                <p class="user-name">${ele.commentPeople}</p>
               ${stars}
            </div>
            <span class="time">${ele.time}</span>
        </div>
        <p class="comment-text">
            ${ele.commentText}
        </p>

        <ul class="comment-img">
           ${commentImg}
        </ul>
    </div>
        `;
    })


    $(".moreComment").before(comment);
    

}
function bindEvent(){
    //页面返回
    $(".back").on("click",function(){
        window.history.back();
    })
}