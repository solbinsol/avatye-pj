import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import ClickLayoutComponent from "./ClickLayoutComponent";
import WebToonPageCss from "./styles/WebToonPageCss.css";

const WebToonPage = () => {
  const router = useRouter();
  const { webtoonName } = router.query;
  //undefined일 때 경우 추가
  const episodeNumber = typeof router.query.episodeNumber === "string" ? parseInt(router.query.episodeNumber) : undefined;
  // parseInt 함수를 사용하여 문자열로 변환된 경우에만 숫자로 변환하도록
  const [webtoons, setWebtoons] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/webtoondetail?name=${encodeURIComponent(webtoonName)}`);
        const data = await response.json();
        const { webtoons } = data;
        //data 의 webtoon_name을 찾아 맞는 webtoon_name를
        const selectedWebtoon = webtoons.find((webtoon) => webtoon.webtoon_name === webtoonName);
        // selectedWebtoon로 할당
        setSelectedWebtoon(selectedWebtoon);
        setWebtoons(webtoons);
        setCount(selectedWebtoon?.count || 0);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    if (webtoonName) {
      fetchData();
    }
  }, [webtoonName]);

  // 기존 코드에서 간소화
  // episodeNumber 추가
  const getWebtoonImage = (webtoon, episodeNumber) => {
    const webtoonImages = {
      //제목이 똑 닮은 딸이고
      "똑 닮은 딸": {
        //episodeNumber가 1화일 때 
        1: [
          "/WebtoonImg/web1/web1_1/web1_1_1.png",
          "/WebtoonImg/web1/web1_1/web1_1_2.png",
          "/WebtoonImg/web1/web1_1/web1_1_3.png",
          "/WebtoonImg/web1/web1_1/web1_1_4.png"
        ],
        //2화일 때 
        2: [
          "/WebtoonImg/web1/web1_2/web1_2_1.png",
          "/WebtoonImg/web1/web1_2/web1_2_2.png",
          "/WebtoonImg/web1/web1_2/web1_2_3.png",
          "/WebtoonImg/web1/web1_2/web1_2_4.png",
          "/WebtoonImg/web1/web1_2/web1_2_5.png"
        ],
        3: [
          "/WebtoonImg/web1/web1_3/web1_3_1.png",
          "/WebtoonImg/web1/web1_3/web1_3_2.png",
          "/WebtoonImg/web1/web1_3/web1_3_3.png",
          "/WebtoonImg/web1/web1_3/web1_3_4.png",
          "/WebtoonImg/web1/web1_3/web1_3_5.png"
        ],
      },
      //제목이 마루는 강쥐고
      "마루는 강쥐": {
        //1화일 때 
        1: [
          "/WebtoonImg/web2/web2_1/web2_1_1.png",
          "/WebtoonImg/web2/web2_1/web2_1_2.png",
          "/WebtoonImg/web2/web2_1/web2_1_3.png"
          ],
        2: [
          "/WebtoonImg/web2/web2_2/web2_2_1.png",
          "/WebtoonImg/web2/web2_2/web2_2_2.png",
          "/WebtoonImg/web2/web2_2/web2_2_3.png",
          "/WebtoonImg/web2/web2_2/web2_2_4.png"
          ],
        3: [
          "/WebtoonImg/web2/web2_3/web2_3_1.png",
          "/WebtoonImg/web2/web2_3/web2_3_2.png",
          "/WebtoonImg/web2/web2_3/web2_3_3.png"
          ],
      },
      "소녀재판": {
        1: [
          "/WebtoonImg/web3/web3_1/web3_1_1.png",
          "/WebtoonImg/web3/web3_1/web3_1_2.png",
          "/WebtoonImg/web3/web3_1/web3_1_3.png"
          ],
        2: [
          "/WebtoonImg/web3/web3_2/web3_2_1.png",
          "/WebtoonImg/web3/web3_2/web3_2_2.png",
          "/WebtoonImg/web3/web3_2/web3_2_3.png"
          ],
        3: [
          "/WebtoonImg/web3/web3_3/web3_3_1.png",
          "/WebtoonImg/web3/web3_3/web3_3_2.png",
          "/WebtoonImg/web3/web3_3/web3_3_3.png"
          ],
      },
    };

    return webtoonImages[webtoon.webtoon_name]?.[episodeNumber] || "";
  };

  const handleWebToonCutClick = (webtoon) => {
    setSelectedWebtoon(webtoon);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  };

  const handleScreenClick = () => {
    setIsVisible(!isVisible);
  };


  return (
    <div className="WebToonPage" onClick={handleScreenClick}>
      <Header />
      <div className="WebToonBox">
        {webtoons.map((webtoon, index) => (
          <div className="WebToonCut" key={index} onClick={() => handleWebToonCutClick(webtoon)}>
            {(webtoon.webtoon_name === "똑 닮은 딸" && episodeNumber >= 1 && episodeNumber <= 5) ? (
              getWebtoonImage(webtoon, episodeNumber).map((image, imageIndex) => (
                <img key={imageIndex} src={image} alt={`Webtoon Image ${imageIndex}`} />
              ))
            ) : (
              <img src={getWebtoonImage(webtoon, episodeNumber)} alt="Webtoon Image" />
            )}
          </div>
        ))}
      </div>
      {selectedWebtoon && isVisible && <ClickLayoutComponent webtoonName={webtoonName} episodeNumber={episodeNumber} maxEp={count} />}
      <Footer />
    </div>
  );
};
export default WebToonPage;