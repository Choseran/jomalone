document.addEventListener("DOMContentLoaded", function () {
    // bg
    function bannerSlideBg() {
        const banners = document.querySelectorAll(".bannerSwiper .swiper-slide");
    
        for (let i = 0; i < banners.length; i++) {
            const banner = banners[i];
            banner.style.background = `url(./img/banner${i + 1}.png) no-repeat center top / cover`
        }
    }
    bannerSlideBg();
    
    const bestGoods = document.querySelectorAll(".best_goods_content .goods_img");
    
    for (let i = 0; i < bestGoods.length; i++) {
        const goods = bestGoods[i];
        goods.style.background = `url(./img/best${i + 1}.png) no-repeat center bottom / cover`
    }
    
    const newGoods = document.querySelectorAll(".newSwiper .goods_img");
    
    for (let i = 0; i < newGoods.length; i++) {
        const goods = newGoods[i];
        goods.style.background = `url(./img/new${i + 1}.png) no-repeat center bottom / cover`
    }
    
    const onlyGoods = document.querySelectorAll(".only_goods .goods_img");
    
    for (let i = 0; i < onlyGoods.length; i++) {
        const goods = onlyGoods[i];
        goods.style.background = `url(./img/only_online${i + 1}.png) no-repeat center bottom / cover`
    }

    // swiper
    let bannerSwiper = undefined;

    function initBannerSwiper() {
        const windowWidth = window.innerWidth;

        if (windowWidth >= 768 && bannerSwiper == undefined) {
            bannerSwiper = new Swiper(".bannerSwiper", {
                loop: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                speed: 1000,
            });
        } else if (windowWidth < 768 && bannerSwiper != undefined) {
            bannerSwiper.destroy();
            bannerSwiper = undefined;
        }
    }

    initBannerSwiper();

    let windowWidth = window.innerWidth;
    let newSwiper;
    
    function initNewSwiper(slide, space) {
        if (typeof (newSwiper) == 'object') {
            newSwiper.destroy();
        }
        newSwiper = new Swiper(".newSwiper", {
            slidesPerView: slide,
            spaceBetween: space,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    // submenu 상세 메뉴 열리기
    function submenuOpen() {
        console.log(windowWidth);
        if (windowWidth < 767) {
            const submenuTitle = document.querySelectorAll('.submenu_title');
            for (const title of submenuTitle) {
                title.addEventListener('click', function () {
                    console.log('.');
                    const content = this.nextElementSibling;
                    const currentHeight = content.style.height;
                    for (const otherTitle of submenuTitle) {
                        const otherContent = otherTitle.nextElementSibling;
                        otherContent.style.height = '0';
                    }
                    if (currentHeight === '0px' || currentHeight === '') {
                        content.style.height = (content.scrollHeight + 30) + 'px';
                    } else {
                        content.style.height = '0';
                    }
                })
            }
        } else if (windowWidth <= 767 && windowWidth <= 1210) {
            const submenuList = document.querySelectorAll('.submenu_list > li');
            for (const list of submenuList) {
                list.addEventListener('mouseenter', function () {
                    console.log('..');
                    const content = this.querySelector('.submenu_link');
                    content.style.height = '0';
                });
            }
        } else if (windowWidth > 1210) {
            const submenuList = document.querySelectorAll('.submenu_list > li');
            for (const list of submenuList) {
                list.addEventListener('mouseenter', function () {
                    console.log('...');
                    const content = this.querySelector('.submenu_link');
                    content.style.height = (content.scrollHeight + 30) + 'px';
                });
                list.addEventListener('mouseleave', function () {
                    const content = this.querySelector('.submenu_link');
                    content.style.height = '0';
                });
            }
        } 
    }
    
    function responsiveNewSwiper() {
        if (windowWidth >= 1356) {
            initNewSwiper(4, 40)
        } else if (windowWidth < 1356 && windowWidth >= 1047) {
            initNewSwiper(3, 20)
        } else if (windowWidth < 1047 && windowWidth >= 785) {
            initNewSwiper(2, 20)
        } else if(windowWidth < 767) {
            initNewSwiper(1, 0)
        }
    }
    
    responsiveNewSwiper();
    submenuOpen();

    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
        initBannerSwiper();
        bannerSlideBg();
        responsiveNewSwiper();
        submenuOpen();
    });

    // submenu
    // 스크롤막기 https://velog.io/@h_jinny/javascript-body-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%A7%89%EA%B8%B0
    const subMenuBtn = document.querySelector(".hamMenu");

    function subMenuScroll() {
        const body = document.querySelector('body');

        function preventScroll(e) {
            e.preventDefault();
        }

        body.addEventListener('wheel', preventScroll, { passive: false });
        subMenuBtn.addEventListener('click', () => {
            body.removeEventListener("wheel", preventScroll, { passive: false });
        });
    }

    function preventDefault(e) {
        e.preventDefault();
    }
    function disableScroll() {
        document.addEventListener('touchmove', preventDefault, { passive: false });
    }
    function enableScroll() {
        document.addEventListener('touchmove', preventDefault);
    }
    
    subMenuBtn.addEventListener("click", function () {
        this.classList.toggle('on');

        const hasClass = this.classList.contains('on');
        
        const subMenu = document.querySelector(".sub_menu");
        const header = document.querySelector("header");
        
        if (hasClass) {
            subMenu.classList.add('on');
            header.classList.add('on');
            subMenuScroll();
            disableScroll();
        } else {
            subMenu.classList.remove('on');
            header.classList.remove('on');
            enableScroll();
        }
    });
    
    // ambassador section bg change
    const ambassadorSec = document.querySelector('.ambassador_section');
    const newSec = document.querySelector('.new_section');

    window.addEventListener("scroll", () => {
        const ambassadorOffset = ambassadorSec.offsetTop -250;
        const newOffset = newSec.offsetTop -250;
        
        const scrollTop = window.scrollY;
        const bodyBg = document.querySelector('body');
        const topBtn = document.querySelector('.top_btn')

        if (scrollTop > ambassadorOffset && scrollTop < newOffset) {
            bodyBg.classList.add('bg');
            topBtn.classList.add('bg');
        } else {
            bodyBg.classList.remove('bg');
            topBtn.classList.remove('bg');
        }
        
    });

    // top btn
    const topBtn = document.querySelector('.top_btn');

    window.addEventListener("scroll", () => {
        const scrolltop = window.scrollY;
        
        if (scrolltop >= 500) {
            topBtn.style.display = "inline-block"
        } else {
            topBtn.style.display = "none"
        }
    });
    
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    });
    
    // top btn footer 들어가기 전 위치에 고정
    // https://hjcode.tistory.com/28
    const footerHei = document.querySelector('footer').offsetHeight;
    
    window.addEventListener("scroll", () => {
        const scrolltop = window.scrollY;
        const val = getDocHeight() - window.innerHeight - footerHei;

        function getDocHeight() {
            var doc = document;
            return Math.max(
                doc.body.scrollHeight,
                doc.documentElement.scrollHeight,
                doc.body.offsetHeight,
                doc.documentElement.offsetHeight,
                doc.body.clientHeight,
                doc.documentElement.clientHeight
            );
        }

        if (scrolltop >= val) {
            topBtn.classList.add('on')
        } else {
            topBtn.classList.remove('on')
        }
    });

    // goods hover event 모바일 제거 후 대체할 click 이벤트
    const goods = document.querySelectorAll('.goods');

    for (const goodsItems of goods) {
        const goodsImg = goodsItems.querySelector('.goods_img');

        goodsImg.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

});