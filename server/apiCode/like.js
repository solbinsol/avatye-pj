//좋아요 관련 api

const likeAPI = (server, getConn) => {

    //좋아요 달기
    server.put('/api/update_like', async (req, res) => {
        const conn = await getConn();

        const { EnName, UserEmail } = req.body; //영어이름과 유저 이메일을 받아옴
        const webtoonIDquery = 'CALL usp_get_webtoonID_EnName(?);'; //webtoonID 추출 sp
        const userIDquery = 'CALL usp_get_userID(?);'; //UserUD 추출 sp
        const putLikeQuery = 'CALL usp_put_likes(?, ?);'; //userID와 webtoonID를 받아 좋아요를 수정하는 sp (추가)

        try {
            //웹툰의 영어이름을 받고 webtoonID 추출
            const [webtoonIDResult] = await conn.query(webtoonIDquery, [EnName]);
            const WebID = webtoonIDResult[0].map((row) => row.webtoonID);

            //UserEmail을 받고 UserID 추출
            const [userIDResult] = await conn.query(userIDquery, [UserEmail]);
            const UserID = userIDResult[0].map((row) => row.userID);

            //추출한 webtoonID와 userID를 좋아요 수정 쿼리에 삽입
            const [Result] = await conn.query(putLikeQuery, [UserID, WebID]);

            //db에서 수행되어 행이 수정된 갯수 
            if (Result.affectedRows > 0) { //1개 이상이면 좋아요 수정 성공
                res.send("좋아요 추가"); 
            } else {
                res.status(500).json('좋아요 실패'); 
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('입력 실패');
        } finally {
            conn.release();
        }
    });

}
module.exports = likeAPI;