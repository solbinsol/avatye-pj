const WebtoonDeleteService = require('../service/webtoonDeleteService');
const axios = require('axios');

const WebtoonDeleteController = {

    // 웹툰 삭제
    async deleteWebtoon(req, res) {
        try {
            const { EnName } = req.body;

            const tokenResponse = await axios.get('http://localhost:4000/api/adminAuth', {
                headers: {
                Cookie: req.headers.cookie,
                },
            });
            if (tokenResponse.data === '어드민 인증 성공') {

                // 유효성 검사
                if (!EnName) {
                    res.send(400, { message: '내용을 입력하세요' });
                    throw new Error('내용을 입력하세요');
                }else{
                    const resultMessage = await WebtoonDeleteService.deleteWebtoon(EnName);
                    res.send(resultMessage); // "웹툰 삭제 성공"
                }
                
            }else {
                res.json({ message: '권한이 없습니다' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },


    // 에피소드 삭제 
    async deleteEpisode(req, res) {
        try {
            const { EnName, ep } = req.body;

            const tokenResponse = await axios.get('http://localhost:4000/api/adminAuth', {
                headers: {
                Cookie: req.headers.cookie,
                },
            });
            if (tokenResponse.data === '어드민 인증 성공') {

                // 유효성 검사
                if (!EnName || !ep) {
                    res.send(400, { message: '내용을 입력하세요' });
                    throw new Error('내용을 입력하세요');
                }else{
                    const resultMessage = await WebtoonDeleteService.deleteEpisode( EnName, ep);
                    res.send(resultMessage); // "에피소드 삭제 성공"
                }
                
            }else {
                res.json({ message: '권한이 없습니다' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
    
};

module.exports = WebtoonDeleteController;
