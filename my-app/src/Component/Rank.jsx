import React, { Component } from "react";
import Link from 'next/link';

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webtoons: []
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`http://localhost:4000/popular`);
      const data = await response.json();
      this.setState({ webtoons: data });
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  }

  getThumbnailImage = async (webtoon) => {
    try { // 엔드포인트로 값 호출
      const response = await fetch(`/api/rank?day=rank`);
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching API:", error);
      return ""; 
    }
  };

  render() {
    const { webtoons } = this.state;

    return (
      <div>
        <h3 className="HHH">인기 웹툰</h3>
        <div className="HotToon">
          {webtoons.map((webtoon, index) => (
            <div className="RBox" key={index}>
              <Link href={`/listpage?webtoonName=${encodeURIComponent(webtoon.webtoon_en_name)}`}>
                <div className="Rank">
                  <div className="Rankitem">
                    <div className="RankImg">
                      <img src="" alt={`${index + 1}등`} ref={imgRef => { //imgRef를 매개변수로 받음
                        if (imgRef) { // 존재할 때
                          this.getThumbnailImage(webtoon) //호출하여 변수에 넣음
                            .then(thumbnail => imgRef.src = thumbnail)
                            .catch(error => console.error("Error loading thumbnail:", error));
                        }
                      }} />
                    </div>
                    <div className="RankNum">
                      <h2>{`${index + 1}등`}</h2>
                    </div>
                    <div className="RankText">
                      <p>{webtoon.webtoon_name}</p>
                      <p>{webtoon.author}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Rank;
