// warning 제거하는법 
/* eslint-disable */
import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {

  // useState 사용시 array([]) 가 생성된다.
  // 이 array는 [a, b] 형태로 생성되는데, a 자리에는 '코트추천'이 들어가고 
  // b 자리에는 '코트추천' state를 정정해주는 함수가 들어감

  // state란?
  // 1. 변수 대신 쓰는 데이터 저장공간 
  // 2. useState()를 이용해서 만들어야한다.
  // 3. 문자, 숫자, array, object 다 저장가능

  // state에 데이터 저장해놓는 이유 
  // 웹이 App 처럼 동작하게 만들고 싶어서
  // state 는 변경되면 HTML이 자동으로 재렌더링된다. (새로고침 없이 값이 변경된다.)
  // 자주 바뀌거나 중요한 데이터는 변수 말고 state로 저장해서 쓰는 것이 좋다.

  // ES6 destructuring 문법 
  // var [a, b] = [10, 100];
  // array, object 에 있던 자료를 변수에 쉽게 담고 싶을 때 사용함
  let [글제목 , 글제목변경] = useState(['코트추천', '비건맛집', '비건제품']);
  let [좋아요, 좋아요변경] = useState(0);
  let [따봉, 따봉변경] = useState(0);
  let [입력값, 입력값변경] = useState('');

  let [modal, modal변경] = useState(true);
  let [누른제목, 누른제목변경] = useState(0);

  // for 반복문을 쓰고 싶다면?
  function 반복된UI() {
    // 함수 안에서 사용!
    var 어레이 = [];
    for (let i =0; i <3; i++) {
      어레이.push(<div>안녕</div>)
    }
    
    return 어레이
  }

  let posts = '맛집!!!';

  function 제목변경 (e) {
    // state의 복사본을 만들어서 수정해주는게 좋다!!
    // JS에서 array나 object 를 그냥 복사하면 X -> deep copy 해서 사용해야함
    // var newArray = 글제목; -> 값 복사가 아니라 값 공유임;; -> reference data type의 특징임
    // deep copy : 값 공유 X , 서로 독립적인 값을 가지는 복사이다.

    // state 수정 테크닉
    // 1. 수정된 [데이터]를 만든다.
    // 2. state를 deep copy 해서 수정한다.
    var newArray = [...글제목];
    // newArray[0] = '여자코트 추천';
    newArray.unshift(e);

    글제목변경(newArray);
  }


  // UI 만드는 법
  // 1. UI와 관련된 중요 정보들을 state로 저장해놓고
  // 2. state에 따라서 UI가 수정되게 만들면 된다.
  return (
    <div className="App">
        <div className ="black-nav">
          <div>개발 Blog</div>
        </div>
        
        {/* <button onClick = { 제목변경 }>버튼</button> */}

        <div className="list">
          <h3> { 글제목[0] } <span onClick ={ () => { 좋아요변경(좋아요 +1) } }>👍</span> { 좋아요 } </h3>
          <p>2월 2일 발행</p>
          <hr />
        </div>

        <div className="list">
          <h3> { 글제목[1] } </h3>
          <p>2월 2일 발행</p>
          <hr />
        </div>

        <div className="list">
          <h3 onClick={ () => { modal변경(true)} }> { 글제목[2] } </h3>
          <p>2월 2일 발행</p>
          <hr />
        </div>

        { 반복된UI() }

        {
          // 반복문 사용법
          // map : array에 붙이는 함수 (유사반복문)
          // { 반복할데이터.map( () => { return <HTML> }) }
          글제목.map( (글, i)=>{
            return (
              <div className="list" key={i}>
                <h3 onClick={ ()=>{ 누른제목변경(i)} }> { 글 } <span onClick ={ () => { 따봉변경(따봉 +1) } }>👍</span> { 따봉 }  </h3>
                <p>2월 2일 발행</p>
                <hr />
              </div>
            )
          })
        }

        {/* <button onClick={ ()=> { 누른제목변경(0) } }>버튼1</button>
        <button onClick={ ()=> { 누른제목변경(1) } }>버튼2</button>
        <button onClick={ ()=> { 누른제목변경(2)} }>버튼3</button>
        <br /> */}

        {/* input 데이터 저장 */}
        {/* 사용자가 입력한 값 = e.target.value */}
        {/* { 입력값 }
        <input onChange={ (e) => { 입력값변경(e.target.value) } } />
        <br/> */}

        <div className="publish">
          <input onChange={ (e) => {입력값변경(e.target.value)} } />
          <button onClick={ () =>{ 제목변경(입력값) } }>저장</button>
        </div>

        <button onClick={ () => { modal변경(!modal) } }>열고닫기</button>

        {
          // {}안에 if문을 쌩으로 작성할 수 없기 때문에 삼항연산자를 사용해줘야함
          // 리액트에서는 UI를 만들 때, state 데이터를 이용한다.
          modal === true 
          ? <Modal 글제목={글제목} 누른제목={누른제목}></Modal> 
          : null
        }


    </div>
  );
}

// Component
// 1. 함수를 만들고 이름짓고 
// 2. 축약을 원하는 HTML에 넣고 
// 3. 원하는 곳에서 <함수명 />

// Component 유의사항 
// 1. 이름은 대문자로 시작
// 2. return() 안에 있는건 태그하나로 묶어야한다.

// Component로 만드는게 좋은 것들
// 1. 반복출현하는 HTML 덩어리들
// 2. 사이트에서 자주 변경되는 HTML UI 들 
// 3. 다른 페이지 만들 때도 컴포넌트로 만드는게 좋다.

// Component 많이 만들면 단점
// 1. state 쓸 때 복잡해짐 (상위 component에서 만든 state 쓰려면 props 문법 이용)
function Modal(props) {
  return (
    <div className = "modal">
      <h2>{ props.글제목[props.누른제목] }</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

// 구버전문법
// 1. class : 변수/함수 보관하는 덩어리
// 2. extends: 오른쪽에 있는 넘의 성질을 물려받는것
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {name: 'Kim', age : 30}
  }

  changeName = () => {
    this.setState( {name: 'Park'})
  }

  render() {
    return(
      <div>
        <h3>프로필입니다.</h3>
        <p>저는 {this.state.name} 입니다.</p>
        <button onClick={ ()=> {this.changeName} } >버튼</button>
      </div>
    )
  }
}

export default App;
