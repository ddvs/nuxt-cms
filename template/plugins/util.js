/**
 * 工具类
 */
//手机号码
const MOBILEPHONE_REGEXP = /^(0)?1([3|4|5|7|8])+([0-9]){9,10}$/;
//邮箱
const EMAIL_REGEXP = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
//身份证
const DICARD_REGEXP = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

export default{
    //货币格式化
    formatCurrency(num){
        num = num||'0';
        num = num.toString().replace(/\$|\,/g,'');
        if(isNaN(num))
            num = "0";
        var sign = (num == (num = Math.abs(num)));
        num = Math.floor(num*100+0.50000000001);
        var cents = num%100;
        num = Math.floor(num/100).toString();
        if(cents<10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
            num = num.substring(0,num.length-(4*i+3))+','+
                num.substring(num.length-(4*i+3));
        return (((sign)?'':'-') + num + '.' + cents);
    },
    //和PHP一样的时间戳格式化函数 格式化后是格林时间
    gmdate( format, timestamp ){
        timestamp = (timestamp===undefined)?this.time():timestamp;
        timestamp = parseInt(timestamp)+(60*(new Date()).getTimezoneOffset());
        return this.date(format, timestamp);
    },
    //类似php的日期转时间戳
    date ( format, timestamp ) {
        var t, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
        var pad = function(n, c){
            if( (n = n + "").length < c ) {
                return new Array(++c - n.length).join("0") + n;
            } else {
                return n;
            }
        };
        var txt_weekdays = ["Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday"];

        var txt_ordin = {1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};

        var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var f = {
            // Day
            d: function(){
                return pad(f.j(), 2);
            },
            D: function(){
                t = f.l(); return t.substr(0,3);
            },
            j: function(){
                return jsdate.getDate();
            },
            l: function(){
                return txt_weekdays[f.w()];
            },
            N: function(){
                return f.w() + 1;
            },
            S: function(){
                return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th';
            },
            w: function(){
                return jsdate.getDay();
            },
            z: function(){
                return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0;
            },

            // Week
            W: function(){
                var a = f.z(), b = 364 + f.L() - a;
                var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;

                if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                    return 1;
                } else{

                    if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                        nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                        return date("W", Math.round(nd2.getTime()/1000));
                    } else{
                        return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                    }
                }
            },

            // Month
            F: function(){
                return txt_months[f.n()];
            },
            m: function(){
                return pad(f.n(), 2);
            },
            M: function(){
                t = f.F(); return t.substr(0,3);
            },
            n: function(){
                return jsdate.getMonth() + 1;
            },
            t: function(){
                var n;
                if( (n = jsdate.getMonth() + 1) == 2 ){
                    return 28 + f.L();
                } else{
                    if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                        return 31;
                    } else{
                        return 30;
                    }
                }
            },

            // Year
            L: function(){
                var y = f.Y();
                return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0;
            },
            //o not supported yet
            Y: function(){
                return jsdate.getFullYear();
            },
            y: function(){
                return (jsdate.getFullYear() + "").slice(2);
            },

            // Time
            a: function(){
                return jsdate.getHours() > 11 ? "pm" : "am";
            },
            A: function(){
                return f.a().toUpperCase();
            },
            B: function(){
                // peter paul koch:
                var off = (jsdate.getTimezoneOffset() + 60)*60;
                var theSeconds = (jsdate.getHours() * 3600) +
                    (jsdate.getMinutes() * 60) +
                    jsdate.getSeconds() + off;
                var beat = Math.floor(theSeconds/86.4);
                if (beat > 1000) beat -= 1000;
                if (beat < 0) beat += 1000;
                if ((String(beat)).length == 1) beat = "00"+beat;
                if ((String(beat)).length == 2) beat = "0"+beat;
                return beat;
            },
            g: function(){
                return jsdate.getHours() % 12 || 12;
            },
            G: function(){
                return jsdate.getHours();
            },
            h: function(){
                return pad(f.g(), 2);
            },
            H: function(){
                return pad(jsdate.getHours(), 2);
            },
            i: function(){
                return pad(jsdate.getMinutes(), 2);
            },
            s: function(){
                return pad(jsdate.getSeconds(), 2);
            },
            //u not supported yet

            // Timezone
            //e not supported yet
            //I not supported yet
            O: function(){
                var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
                if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
                return t;
            },
            P: function(){
                var O = f.O();
                return (O.substr(0, 3) + ":" + O.substr(3, 2));
            },
            //T not supported yet
            //Z not supported yet

            // Full Date/Time
            c: function(){
                return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P();
            },
            //r not supported yet
            U: function(){
                return Math.round(jsdate.getTime()/1000);
            }
        };

        return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
            var ret ;
            if( t!=s ){
                // escaped
                ret = s;
            } else if( f[s] ){
                // a date function exists
                ret = f[s]();
            } else{
                // nothing special
                ret = s;
            }
            return ret;
        });
    },
    //类似php的日期转时间戳
    strtotime(datetime){
        var p = {};
        p.datetime = datetime || ''; datetime = undefined ;
        p._ = p.datetime.toString().indexOf(' ')==-1?(p.datetime.toString().indexOf(':')==-1?[p.datetime,'']:['',p.datetime]):p.datetime.split(' ');
        p.ymd = p._[0]||'';
        p.his = p._[1]||'';
        p.ymd = p.ymd.toString().indexOf('-')==-1?[p.ymd]:p.ymd.split('-');
        p.his = p.his.toString().indexOf(':')==-1?[p.his]:p.his.split(':');
        p.year = (p.ymd[0]||0) - 0 ;
        p.month = (p.ymd[1]||0) - 1 ;
        p.day = (p.ymd[2]||0) - 0 ;
        p.hour   = p.his[0] - 0;
        p.minute = p.his[1] - 0;
        p.second = p.his[2] - 0;
        //兼容无"时:分:秒"模式
        if((p.his[0]==undefined) || isNaN(p.hour)){
            p.hour=0;
        }
        if((p.his[1]==undefined) || isNaN(p.minute)){
            p.minute=0;
        }
        if((p.his[2]==undefined) || isNaN(p.second)){
            p.second=0;
        }
        p.time = (new Date(p.year, p.month, p.day, p.hour, p.minute, p.second)).getTime();
        p = parseInt( p.time / 1000 );
        return p;
    },
    //返回所有结果集,格式为[[1,2,3],[4,5,6]...]
    combine(array){

        if(!(array instanceof Array)){
            console.error('非法数组');
            return;
        }

        var r= [];
        (function f(t,a,n){
            if (n === array.length) return r.push(t);

            for(var i=0; i<a[n].length; i++){
                f(t.concat(a[n][i]),a,n+1);
            }

        })([],array,array.length - array.length);

        return r;
    },
    //移除所有值为假的对象，返回对象本身
    compactObj(obj){
        for(let v in obj){
            if(obj.hasOwnProperty(v)){
                if(!obj[v]){
                    delete obj[v];
                }
            }
        }
        return obj;
    },
    //移除所有值为假的数组，返回数组本身
    compactArray(array){

        if(!(array instanceof Array)){
            console.error('非法数组');
            return;
        }

        let index = -1,
            length = array.length;

        while (++index < length) {
            let value = array[index];
            if (!value) {
                array.splice(index,1);
            }
        }
        return array;
    },
    //验证。暂时支持：手机号、邮箱、身份证。后面补
    regCheck(num,type){
        var flag;

        if(!type){
            console.warn('传入你要检测的类型');
            return;
        }

        type = type.toLocaleLowerCase();
        switch (type) {
            case 'mobile_phone':
                flag = MOBILEPHONE_REGEXP.test(num);
                break;
            case 'e_mail':
                flag = EMAIL_REGEXP.test(num);
                break;
            case 'id_card':
                flag = DICARD_REGEXP.test(num);
                break;
            //no default:
        }
        return flag;
    },
    //获取当前时间开始
    now(){
        return (new Date()).getTime();
    }
};
