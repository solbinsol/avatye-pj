import React, { Component } from "react";
import MainPageCss from "../styles/MainPageCss.css";

import Header from "./header";
import Footer from "./footer";
import NewToon from "../item/NewToon";
import DayMain from "../item/DayMain";
import DayToonItem from "../item/DayToonItem";
import Rank from "../item/Rank";

class MondayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayToonItemCounts: []
    };
  }

  componentDidMount() {
    // 데이터베이스에서 요일별 아이템 수를 가져오는 비동기 작업 수행
    // 예시로 고정된 값을 설정
    const fetchedDayToonItemCounts = [2, 0, 0];
    this.setState({ dayToonItemCounts: fetchedDayToonItemCounts });
  }

  static defaultProps = {
    title: '제목',
    week: '월',
    writer: '작가',
    star: 9.9
  }

  render() {
    const { dayToonItemCounts } = this.state;

    return (
      <div className="DayBox">
        <Header />  
        <h3 className="Categories">{this.props.week}요일 추천 웹툰</h3>
        <div className="NewToon">
          <NewToon />
        </div>
        <div className="Mid">
          <div className="DayToon">
            <h3>전체{this.props.week}요 웹툰</h3>
            <table>
              <tbody>
                {dayToonItemCounts.map((count, index) => (
                  <tr key={index}>
                    {[...Array(count)].map((_, subIndex) => (
                      <td key={subIndex}>
                        <DayToonItem />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Rank />
        </div>
        <Footer />
      </div>
    );
  }
}

export default MondayPage;
