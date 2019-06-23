# 자동 시간표 생성

## 실행 방법

``` bash
$ git clone https://github.com/hodory/source.timetable.front-end.git
$ cd ./source.timetable.front-end
 # dev모드로 실행
$ npm i && npm run dev
```

## 설계
### 구조 설계

트래픽이 많아질 경우를 대비하여, 프론트 서비스와 백엔드 서비스를 분리하여 구현하고자 했습니다.(개별 Scale In-Out 이나 Scale Up-Down이 유연)

프론트 서비스는 Nuxt.js를 이용하여 정적 페이지를 제공하도록 구현합니다.

API 요청은 학과 선택시 등록되어 있는 과목을 가져올 경우에만 사용 하도록 구현하여, 요청을 최소화 하고자 했습니다.

Single Page Application으로 구성하여, 화면을 재렌더링 하지 않으므로 다양한 경우를 빠르게 재렌더링하여 확인 가능하도록 계획하였습니다. 

### 데이터 설계

기본적인 API 응답 포맷은 아래와 같습니다.

`{{BASE_URL}}/v1/subject/list/major=${major}`와 같이 major값을 기준으로 조회 가능합니다.

1개의 과목이 여러개의 강의 요일 및 시간을 가질 수 있도록 설계 하였으며,<br/>
DateTime Object로 변환하기 위한 요일 / 시작시간 / 종료시간을 가지고 있습니다.<br/>
3학점 이상의 과목은 하나의 선택지에 2일에 나뉘어 가질수 있게 설계하였습니다.

```json
{
  "major": "COMPUTER_SCIENCE",
  "list": [
    {
      "title": "IT-리더십 세미나",
      "grade": 1,
      "options": [
        {
          "times": [
            {
              "day": 1,
              "startTime": "09:00:00",
              "endTime": "11:00:00"
            }
          ]
        },
        {
          "times": [
            {
              "day": 2,
              "startTime": "11:00:00",
              "endTime": "13:00:00"
            }
          ]
        },
        {
          "times": [
            {
              "day": 4,
              "startTime": "09:00:00",
              "endTime": "11:00:00"
            }
          ]
        }
      ]
    },
    {
      "title": "소프트웨어 개발의 원리와 실습",
      "grade": 3,
      "options": [
        {
          "times": [
            {
              "day": 2,
              "startTime": "16:00:00",
              "endTime": "18:00:00"
            },
            {
              "day": 3,
              "startTime": "16:00:00",
              "endTime": "18:00:00"
            }
          ]
        },
        {
          "times": [
            {
              "day": 3,
              "startTime": "13:00:00",
              "endTime": "15:00:00"
            },
            {
              "day": 5,
              "startTime": "13:00:00",
              "endTime": "15:00:00"
            }
          ]
        },
        {
          "times": [
            {
              "day": 4,
              "startTime": "14:00:00",
              "endTime": "16:00:00"
            },
            {
              "day": 5,
              "startTime": "15:00:00",
              "endTime": "17:00:00"
            }
          ]
        }
      ]
    }
  ]
}    
```

### 프로세스 설계

1. 학과 선택
2. 과목 선택<br> 
  2.1. 최소 18학점, 최대 21학점(21학점 이상일 경우 알림창 노출)<br/>
  2.2. 해당 학점에 해당 하지 않을 경우 기존 조회한 시간표는 노출되나,<br/>
  시간표를 새로 조회하기 위한 버튼을 노출하지 않음
3. 조회하기 버튼 클릭시 재귀함수를 통해 조합 가능한 모든 경우를 생성하여, 시간대가 겹치는 경우 경우의수에서 제외함
4. tui-calendar에 데이터를 바인딩하여 데이터를 캘린더에 맞게 가공하여 렌더링함<br/>
  4.1. 동일 과목의 경우 동일한 색상으로 노출하여 혼란 방지
5. 이전/다음 버튼을 이용하여 가능한 경우의 수를 노출.

## UI

[Toast Calendar UI Component](https://github.com/nhn/toast-ui.vue-calendar)를 이용하여 캘린더를 렌더링 시키도록 하였고,

[Vue Multi Select](https://github.com/shentao/vue-multiselect)를 이용하여 학과 및 과목 선택을 검색 및 자동완성 가능하도록 하였습니다.

## 배포

백엔드 서비스는 Heroku 서비스를 이용하여 배포를 진행하고 Heroku 내부의 plugin을 이용하여 MySQL DB를 사용합니다.

프론트 서비스는 소스코드를 관리하는 Repository 와 별개로 Github Pages를 이용하여 정적 호스팅을 사용하여 서비스합니다.

