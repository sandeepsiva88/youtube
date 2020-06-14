var express = require('express');
var router = express.Router();
var fetchVideoInfo = require('youtube-info');
var monk = require('monk');
var db = monk('localhost:27017/youtube');
var col = db.get('video');
/* GET home page. */
router.get('/', function(req, res) {
	var videos = 
	['w0-E-a89LSQ',
	'LkkkL7CSISQ',
	'WUT7_jkiUoM',
	'z90T03YQa7k',
	'PelFrTNvEcQ',
	'wuJKi1YSgS0',
	'6nBXwJSKmbc',
	'faI9gfRL2VQ',
	'pXLU5tXFH84',
	'Veo7VC65iDU',
	'WXWbQhnigSk',
	'uaB21bAp4Qw',
	'mOw-dN9hPa0',
	'yznDG4G4Itc',
	'RMa7tNiLqsQ',
	'WRbkk6p_xI8',
	'RFtmCfOUUqY',
	'GTvfwiQiV5w',
	'XJBwzkBabbI',
	'OC_W7LxEk2s',
	'lxD1rvdKc9s',
	'HQH1FMdtHa4',
	'GHXtWIzTYEU',
	'sDfYCKyDY1A',
	'7joM6g3SrsQ',
	'KQ9B-0OYJew',
	'5Pvy7HA8eVk',
	'Pcs00xJ1Al0',
	'm_k1i7m1_2I',
	'Wi1WZsX5fp4',
	'H0rMC7SFPPo',
	'kDreWuK_U5c',
	'NYxmKsx20A8',
	'7ldAwYvsbP8',
	'Q9h8tZeQyMA',
	'CXTLj1Qv7Fo',
	'Aa8YukR0IWo',
	'lh1abfTdWYQ',
	'UCp0iHhw3sY',
	'IBYlMgp0jmc',
	'iQnPr4G0oa4',
	'5FQiNwWr1lU',
	'jamqdeXNWFU',
	'YII244H27tY',
	'JltCps3Dbns',
	'O-vht8A0FDs',
	'QHtzsEW-txU',
	'FSsYUzK6LZ0',
	'AXOZDVBXO8I',
	'RKFZ4M5xeFo',
	'PLVsx5d0SKo',
	'pDdJF5mRzXU',
	'a8c4JuvN6pk',
	'yIJoX2_qI0Q',
	'7U9e0r_uFMw',
	'07IhAi1DbdE',
	'kK3iAATFM1I',
	'2gxD8HcAvbQ',
	'RgCNndESsD4']
	for (var i = 0; i < videos.length; i++) {
	fetchVideoInfo(videos[i], function (err,videoInfo) {
       if (err) return console.log('error');
       col.update({'title':videoInfo.title},{$set:{'title':videoInfo.title,'views':videoInfo.views,'likes':videoInfo.likeCount}},{upsert: true},{multi: true})
    });
    }
    col.find({},function(err,docs){
    	if(err){
    		console.log(err);
    	}
    	else{
    		res.locals.data = docs
            res.render('index');
    	}
    })
});

module.exports = router;
