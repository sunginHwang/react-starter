
# 스타터 실행
> npm run install && npm run start

# react 프로젝트 작성 가이드

## 프로젝트 주요 사용 lib
* **react** - frontEnd 프로젝트 관리 lib
* **redux** - globalState 관리
* **redux-saga** - 미들웨어 관리
* **immer** - 불변성 관리
* **loadable/component** - 코드 스플리팅
* **styled-components** : css-in-js 스타일 관리
* **typesafe-actions** - redux타입 관리


## 폴더 구성
```
project
├── dist
├── node_modules
├── src
│   ├── components   #redux 등의 상태를 보지않는 컴포넌트를 정의합니다.
│   │   ├── xxx
│   │   └── xxx
│   ├── containers  # redux 등의 상태가 필요한 비즈니스로직 컴포넌트를 정의합니다.
│   ├── config  # 환경별 config 설정 파일  
│   │   ├── local.ts
│   │   ├── dev.ts
│   │   ├── stage.ts
│   │   ├── prod.ts
│   │   └── index.ts
│   ├── support
│   │   ├── api     # api 요청 모음
│   │   ├── utils   # 각종 유틸 함수를 작성합니다.
│   │   └── ....
│   ├── models      # 타입선언에 대해 해당 폴더에 모아두도록 합니다.
│   ├── pages  # Page 첫 진입 컴포넌트를 정의합니다.
│   ├── static  # 이미지 파일 , global css 파일등을 정의합니다. 
│   ├── store   # redux 스토어
│   │   ├── module      #각 reducer 모음.
│   │   │   ├── index.ts
│   │   │   └── ....modules     #reducer는  ducks 패턴 으로 사용합니다.
│   │   └── index.ts
│   └── styles // 스타일 영역을 정의합니다.
│
├── .gitignore
├── package.json
├── ,,,,, (extra files)
└── README.md
```

## 파일 네이밍 규칙
* containers 폴더내의 컴포넌트는 항상 `Container` 를 `subfix`로 붙여주도록 합니다.
* 리액트 컴포넌트 파일은 반드시 **tsx 확장자 로 선언** 합니다.

## 타입 정의 규칙
* type 과 interface 의 구분은 다음과 같이 구분 합니다.
    * `interface`: 접근자와 메소드가 필요한 경우
    * `type`: 접근자와 메소드가 필요 없는 경우
    
## 컴포넌트 구조
기본적으로 컴포넌트 선언 디렉토리는 다음으로 판단 합니다.
* **containers 디렉토리** : redux의 상태 조회 및 값의 변경 등의 비즈니스 로직이 일어나는 컴포넌트
* **components 디렉토리** : redux에 직접 연결되지 않고 UI 관련 상태를 제외한 자신의 상태는 최소화 해야 합니다.
* **pages** 디렉토리 : route 를 통한 첫 진입 페이지에 해당하는 컴포넌트를 정의합니다.

## 컴포넌트 스타일링
* 컴포넌트 스타일 작성은 현재 가장 대중적으로 사용하고 있는 `css-in-js` 의 `styled-components` 를 사용합니다.
* `styled-components` 를 사용하기 때문에 IDE가 styled-components 에 대한 에디팅 활성화를 위해 플러그인을 받아 주도록 합니다. [웹스톰 플러그인](https://plugins.jetbrains.com/plugin/9997-styled-components--styled-jsx)

## 컴포넌트 작성 가이드.

```js
import React from 'react';
import styled from 'styled-components';

// 1. 타입 설정의 경우 컴포넌트이름+Props 로 명칭한다.
type TodoItemProps = {
    title: string,
    content: string
}


/*
* 2. 리액트 함수형 컴포넌트 작성은 arrow function 이 아닌 function(){} 으로 작성한다.
*  function 키워드 컴포넌트 작성은 react 공식메뉴얼에도 해당방식으로 사용하고 방법 현재 추세라고 합니다.
*  React.FC 의 기본타입을 사용하지 않는 이유는 다음과 같습니다. [관련링크](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680#78b9)
*   - defaultProps가 제대로 동작 하지 않음.
*   - children 타입이 기본적으로 들어있어 명시적으로 옵셔널, 필수 선택 구분 불
* */
function TodoItem({title, content}: TodoItemProps) {
    // 3. return 전 렌더링 변수의 경우는 접두사로 `render` 를 작성해 혼동할 부분을 최대한 줄인다.
    const renderTitle = <h3>{title}</h3>;

    return (
        <S.TodoItem>
            {renderTitle}
            <p>{content}</p>
        </S.TodoItem>
    );
};

// 4. 기본값 세팅은 export 직전에 작성 한다.
TodoItem.defaultProps = {
    title: '타이틀 기본 값',
    content: '콘텐츠 기본 값'
};

export default TodoItem;

/*
* 5. css-in-js 을 통한 컴포넌트 작성으로 스타일컴포넌트인지 실제 컴포넌트인지 네이밍의 혼동을 줄이기 위해 `S.` 접두사를 작성해서 선언한다.
* 스타일 컴포넌트는 항상 최 하단에 작성한다.
* */
const S = {
  TodoItem = styled.div`
  ...style 작성
    `
  ```
};



## 컴포넌트 작성 방법 - 생명주기 작성 순서.
각 컴포넌트 작성 순서의 일관성을 위해 다음과 같은 순서로 컴포넌트 작성을 표준화 합니다.
```js
function Todo({}: TNextPage<todoProps>) {

    //1. 컴포넌트 localState 정의
    const {title, setTitle } = useState('');
    
    //2. 스토어 영역 정의
    const a = useSelector(()=>); 
    const dispatch = useDispatch();
    
    //3. 생명주기 영역 정의 (생명주기 흐름 순서대로 작성해주도록 합니다.)
    useEffect(()=>{},[]) // didMount 우선. unMount 단계도 해당 effect의 return 에서 처리
    useEffect(()=>{},[...]) // didUpdate

    //4. render될 변수 정의
    const renderTitle = <h3>{title}</h3>;


    return (
        <div>
            {renderTitle}
            <TodoContainer/>
        </div>
    );
};
```

## 리덕스 작성 방법.
해당 프로젝트 셋업은 **redux + redux-saga 로 구성**되어 있고 **작성패턴은 [ducks패턴](https://medium.com/@matthew.holman/what-is-redux-ducks-46bcb1ad04b7)에  saga를 추가**한 구성으로 이루어져 있습니다. 

###  덕스패턴을 이용한 module 작성 규칙
기본적인 모듈들에 대한 작성 순서는 일관성 유지를 위해 다음과 같은 순서대로 작성합니다.

```ts
import {createReducer, createAction, ActionType} from 'typesafe-actions';
import {takeEvery} from 'redux-saga/effects';
import {produce} from 'immer';
import {createAsyncSaga, asyncAction, asyncActionCreator} from "../../core/utils/reduxUtil";
import {fetchTodo} from "../../core/api/TodoApi";
import {ITodo} from "../../models/ITodo";
import {TAsyncState} from "../../models/redux/TAsyncState";

//1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성한다.
const prefix: string = 'todo/';

//2. 액션생성자함수에 대해서 정의한다. 
const CHANGE_TODO_TITLE = `${prefix}CHANGE_TODO_TITLE`;
const ASYNC_TOGO = asyncActionCreator(`${prefix}ASYNC_TOGO`);

//3. 액션에 대해서 정의한다.
export const getAsyncTodo = asyncAction<string, ITodo, string>(ASYNC_TOGO);
export const changeTodoTitle = createAction(CHANGE_TODO_TITLE)<string>();

//4. saga 비동기 관련 함수가 필요할 경우 작성 한다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const getAsyncTodoSaga = createAsyncSaga(getAsyncTodo, fetchTodo);

//5. 해당 리듀서의 상태 타입을 정의합니다.
export type TTodoState = {
    todo: TAsyncState<ITodo>
}

//6. 리듀서의 값을 정의합니다.
const initialState: TTodoState = {
    todo: {
        loading: false,
        data: {
            title: '',
            content: '',
        },
    }
};

//7. 리듀서를 정의합니다.
export default createReducer<TTodoState>(initialState, {
    [CHANGE_TODO_TITLE]: (state, action: ActionType<typeof changeTodoTitle>) =>
        produce(state, draft => {
            draft.todo.data.title = action.payload;
        }),
    [ASYNC_TOGO.REQUEST]: (state) => produce(state, draft => {
        draft.todo.loading = true;
    }),
    [ASYNC_TOGO.SUCCESS]: (state, action: ActionType<typeof getAsyncTodo.success>) => produce(state, draft => {
        draft.todo.loading = false;
        draft.todo.data.title = action.payload.title;
        draft.todo.data.content = action.payload.content;
    }),
    [ASYNC_TOGO.FAILURE]: (state, action: ActionType<typeof getAsyncTodo.failure>) => produce(state, draft => {
        draft.todo.loading = false;
        draft.todo.data = initialState.todo.data;
        draft.todo.error = action.payload;
    }),
});

//8. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* todoSaga() {
    yield takeEvery(ASYNC_TOGO.REQUEST, getAsyncTodoSaga);
}
```

모듈 생성시 saga 함수가 추가된다면 해당 함수는 **store/index.ts** 에 추가해 주도록 합니다.

```ts
...
function* rootSaga() {
    yield all([todoSaga()]);
}
...

```

### 비동기 데이터 타입 구성
비동기 요청 데이터의 경우 **loading, data, error** 로 분류하여 이에대한 공통타입인 `TAsyncState` 를 사용하여 정의합니다. 해당 타입 구성은 다음과 같습니다.

```ts
export type TAsyncState<P> = {
    loading: boolean;
    data: P;
    error?: any;
}
```

## saga를 사용한 비동기 middleware 사용
비동기에 대한 요청은 **요청, 요청성공, 요청 실패** 3가지의 상태로 호출하도록 미들웨어를 사용합니다. 이에 대한 액션, 액션생성자, saga메소드 작성 가이드는 다음과 같습니다.

### 1. 비동기 액션 생성자 함수 사용
1개의 상태를 **REQUEST(요청), SUCCESS(성공), FAILURE(실패)** 의 3가지 상태로 구분 처리하기 위해 아래와 같은 유틸함수를 사용합니다.
```ts
type TAsyncAction = {
    REQUEST: string,
    SUCCESS?: string,
    FAILURE?: string,
}

export const asyncActionCreator = (actionName: string): TAsyncAction => {
    const asyncTypeAction: string[] = ['_REQUEST', '_SUCCESS', '_FAILURE'];

    return {
        'REQUEST': actionName + asyncTypeAction[0],
        'SUCCESS': actionName + asyncTypeAction[1],
        'FAILURE': actionName + asyncTypeAction[2],
    };
};
```
위의 유틸함수인 `asyncActionCreator` 를 통해 호출하면 1개의 액션생성자를 **REQUEST(요청), SUCCESS(성공), FAILURE(실패)** 3개로 만들어 줍니다. 사용예시는 다음과 같습니다.

```ts
const ASYNC_TOGO = asyncActionCreator(`${prefix}ASYNC_TOGO`);
```

### 2. 비동기 액션 함수 사용
1번에서 작성한  **REQUEST(요청), SUCCESS(성공), FAILURE(실패)**  3가지 상태를 가진 생성자함수에 대응하는 액션 함수를 위해 관련 유틸함수를 동일하게 작성합니다.
```ts
import { createAsyncAction} from "typesafe-actions";

type TAsyncAction = {
    REQUEST: string,
    SUCCESS?: string,
    FAILURE?: string,
}

export const asyncAction = <T, P, J>(asyncAction: TAsyncAction) => {
    return createAsyncAction(asyncAction.REQUEST,
        asyncAction.SUCCESS,
        asyncAction.FAILURE,
    )<T, P, J>();
}
```
`typesafe-actions` 에서 제공하는 [createAsyncAction](https://github.com/piotrwitek/typesafe-actions/blob/master/src/create-async-action.spec.ts) 를 사용하여 request, success, failure 에 해당하는 각 액션 함수를 생성합니다.

 유틸함수인 **asyncAction의  제네릭 타입선언 순서**는 다음과 같습니다. <request, success, failure>

#### 함수 사용 방법
```ts
interface ITodo {
    title: string;
    content: string;
}

const ASYNC_TOGO = asyncActionCreator(`${prefix}ASYNC_TOGO`);
export const getAsyncTodo = asyncAction<string, ITodo, string>(ASYNC_TOGO);

// 사용시
getAsyncTodo.request('requestParams');
```

### 3. 비동기 액션에 대한 saga 함수 작성
2번에서 작성한 액션함수에서 `.request()` 함수를 dispatch 할 경우 이에 대한 API 호출 이후 그에 따른 `.success()` or `.failure()` 에 대한 dispatch 를 해주는 saga 유틸 함수를 작성합니다.

```ts
// payload 가 있는 경우와 없는 경우 둘다 처리하기 위한 타입.
type TPromiseCreatorFunction<P, T> = ((payload: P) => Promise<T>) | (() => Promise<T>);


export default function createAsyncSaga<RequestType, RequestPayload, SuccessType, SuccessPayload, FailureType, FailurePayload>(
    asyncAction: AsyncActionCreatorBuilder<[RequestType, [RequestPayload, undefined]],
        [SuccessType, [SuccessPayload, undefined]],
        [FailureType, [FailurePayload, undefined]]>,
    asyncFunction: TPromiseCreatorFunction<RequestPayload, SuccessPayload>,
    successFunc?: any, failureFunc?: any) {

    return function* saga(action: ReturnType<typeof asyncAction.request>) {
        try {
            const result: SuccessPayload = yield call(asyncFunction, (action as any).payload); // api 호출 이때 파라미터는 request()에서 받은 값으로 전달
            yield put(asyncAction.success(result)); // success  액션함수를 dispatch 하여 api결과값 반환
            if (successFunc) {
                yield call(successFunc, result); // 성공 이후의 추가 액션이 필요할 경우 이에대한  callback 선언
            }
        } catch (e) {
            yield put(asyncAction.failure(e)); // failure  액션함수를 dispatch 하여 error 반환
            if (failureFunc) {
                yield call(successFunc, e); // 실패 이후의 추가 액션이 필요할 경우 이에대한  callback 선언
            }
        }

    }

}
```
해당 `createAsyncSaga` 유틸함수에 첫번째 인자에는 `3번`에서 작성한 액션함수를 넣어주고 2번째 인자에는 호출할 API함수를 작성합니다. 해당 유틸함수를 통해 작성하게 되면 다음과 같이 선언하면 됩니다.

```ts
// saga 비동기 함수 선언.
const getAsyncTodoSaga = createAsyncSaga(getAsyncTodo, fetchTodo);

//ASYNC_TOGO.REQUEST 요청이 들어올경우 해당 사가함수를 호출하도록 명시
export function* todoSaga() {
    yield takeEvery(ASYNC_TOGO.REQUEST, getAsyncTodoSaga);
}

```

## 4. 리듀서 작성
리듀서는 immer를 사용해 불변성을 관리하고 createReducer 유틸을 이용해 다음과 같은 패턴으로 작성합니다.

```ts
export default createReducer<TTodoState>(initialState, {
    [CHANGE_TODO_TITLE]: (state, action: ActionType<typeof changeTodoTitle>) =>
        produce(state, draft => {
            draft.todo.data.title = action.payload;
        }),
    [ASYNC_TOGO.REQUEST]: (state) => produce(state, draft => {
        draft.todo.loading = true;
    }),
    [ASYNC_TOGO.SUCCESS]: (state, action: ActionType<typeof getAsyncTodo.success>) => produce(state, draft => {
        draft.todo.loading = false;
        draft.todo.data.title = action.payload.title;
        draft.todo.data.content = action.payload.content;
    }),
    [ASYNC_TOGO.FAILURE]: (state, action: ActionType<typeof getAsyncTodo.failure>) => produce(state, draft => {
        draft.todo.loading = false;
        draft.todo.data = initialState.todo.data;
        draft.todo.error = action.payload;
    }),
});
```

## 5. 컴포넌트에서 위에 선언한 비동기 호출 
```ts
const dispatch = useDispatch();
dispatch(getAsyncTodo.request('requestParam'));
```



