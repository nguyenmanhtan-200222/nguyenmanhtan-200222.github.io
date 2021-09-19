const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const audio = $('audio');
const named = $('header h2')
const img = $('.cd-thumd')
const player =$('.player')
const play = $('.btn');
const btnnext = $('.btn-next');
const btnskip = $('.btn-skip '); 
const cdimg = $('.cd-img')
const back = $('.back');
const shuffle = $('.shuffle');
const inputrunmusic = $('.input-run-music')
const cdthumd = $('.cd-thumd');
const ative = $('.ative');
const colorsong =$('.song')
const playlist=$('.playlist');
const colorramdom = $('.fas fa-random')
    const app={
        isplay:false,
        isramdom:false,
        const: _this=this,
        currentindex :0,
        song:[
            
            {
                name: 'all fall down',
                singer: 'alan waker',
                image: './asset/img/song1.jpg',
                path: './asset/music/song1.mp3',
            },
            {
                name: 'dark side',
                singer: 'alan waker',
                image: './asset/img/song2.jpg',
                path: './asset/music/song2.mp3',
            },
            {
                name: 'nevada',
                singer: 'Cozi Zuehlsdorff (Lyrics)',
                image: './asset/img/song3.jpg',
                path: './asset/music/song3.mp3',
            },
            {
                name: 'the river',
                singer: 'axel',
                image: './asset/img/song4.jpg',
                path: './asset/music/song4.mp3',
            },
            {
                name: 'unity',
                singer: 'alan waker',
                image: './asset/img/song5.jpg',
                path: './asset/music/song5.mp3',
            },
            {
                name: 'where we started',
                singer: 'lost sky',
                image: './asset/img/song6.jpg',
                path: './asset/music/song6.mp3',
            },
            {
                name: 'way back',
                singer: 'Vicetone, Cozi Zuehlsdorff',
                image: './asset/img/song7.jpg',
                path: './asset/music/song7.mp3',
            },
            {
                name: 'fly away',
                singer: 'TheFatRat',
                image: './asset/img/song8.jpg',
                path: './asset/music/song8.mp3',
            },

        ],
        //renderbown ra giao diện 
        renderbown:function(){
            const htmls = this.song.map(function(listmusic,id){
                return`
                <div class="song ${id === app.currentindex ? 'ative' : ''}" box="${id}">
                    <div class="thumb">
                        <img src="${listmusic.image}" alt="" class="song-img">
                    </div>
                    <div class="body">
                        <h3 class="title"> ${listmusic.name}</h3>
                        <p class="author">${listmusic.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                `;
            })
            playlist.innerHTML=htmls.join('');
        },
        defineProperty : function(){
            Object.defineProperty(this,'currentsong',{
                get:function(){
                    return this.song[this.currentindex];
                }
            });
        },

        // xử lý sự kiện
        handleevents: function () {

            // xử lý cd
            const cd= $('.cd-thumd');
            const cdwidth = cd.offsetWidth 
            document.onscroll= function(){
                
                const scroll = document.documentElement.scrollTop
                const newcd = cdwidth - scroll ;

                cd.style.width = newcd>0? newcd+'px':0
            
            }
            // xử lý khi next bài
            
            btnnext.onclick= function(){
                if(_this.isramdom){
                    app.ramdonsong()
                }else{
                    app.nextsong()
                }
                audio.play();
                app.renderbown()
                app.scrollmusic();
            }

            // xử lý khi back lại bài
            back.onclick = function(){
                audio.load();
                audio.play();
                
            }

            // xử lý khi skip bài
            btnskip.onclick= function () {
                if(_this.isramdom){
                    app.ramdonsong()
                }else{
                    app.prevsong();
                }
                audio.play();
                app.renderbown();
                app.scrollmusic();
            }
            // xử lý khi play hoăc pasue
            play.onclick = function () {
                if(_this.isplay) {
                    audio.pause();
                }else{
                    audio.play();
                }
            }
            // xử lý khi play
            audio.onplay = function(){
                _this.isplay = true;
                player.classList.add('playing')
                play.classList.add('red')
                cdanimate.play()
            }
            // xử lý khi bị pause
            audio.onpause = function(){
                _this.isplay = false;
                player.classList.remove('playing')
                play.classList.remove('red')
                cdanimate.pause()
            }
            // xử lý khi tua
            audio.ontimeupdate = function(){
                if(audio.duration){
                    const valued = Math.floor(audio.currentTime /audio.duration *100);
                    inputrunmusic.value=valued;
                    
                }
            }
            inputrunmusic.onchange=function(e){
                const currrntvlue = audio.duration/ 100  * e.target.value
                audio.currentTime = currrntvlue;
            
            }
            // xử lý khi ramdom
            shuffle.onclick = function () {
                
                if(_this.isramdom = !_this.isramdom){
                    shuffle.classList.add('red')
                }else{
                    shuffle.classList.remove('red')
                }

            }
            // xử lý khi cd quay / dung
            const cdanimate = cdthumd.animate([
                { transform: 'rotate(360deg)'}
            ], {
                duration: 10000,
                iterations: Infinity,
            })
            cdanimate.pause()
            // xử lý khi het bai 
            audio.onended = function () {
                btnnext.click()
            }
            playlist.onclick = function (e) {
                const id = e.target .closest('.song:not(.ative)');
                if(id){
                    app.currentindex=Number(id.getAttribute('box'))
                    app.loadmusic(),
                    audio.play();
                    app.renderbown();

                }
            }

        },
        scrollmusic: function () {
            setTimeout(function (){
                $('.song.ative').scrollIntoView({
                    behavior : 'smooth',
                    block : 'nearest'
                });
            },200)
        },
        ramdonsong: function () {
            let newsong
                do{
                    newsong = Math.floor(Math.random()* this.song.length)
                }while(newsong === this.currentindex)
            this.currentindex=newsong;
            this.loadmusic()
        },
        
        nextsong: function () {
            this.currentindex++;
                if(this.currentindex>=this.song.length){
                    this.currentindex = 0;
                }                
            this.loadmusic();

        },
        prevsong: function () {
            this.currentindex--;
                if(this.currentindex<0){
                    this.currentindex = this.song.length-1;
                }                
            this.loadmusic();
        },
        loadmusic: function () {
            named.textContent= this.currentsong.name;
            cdimg.src= this.currentsong.image
            audio.src=this.currentsong.path;
        },
        start: function () {
            this.defineProperty();
            this.renderbown();
            this.handleevents();
            this.loadmusic();
        }
        
    }
    app.start();

