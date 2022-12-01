const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changedGoodState = { 
        ...state
      }
      ++changedGoodState.good
      return changedGoodState
    case 'OK':
      const changedOkState = { 
        ...state
      }
      ++changedOkState.ok
      return changedOkState
    case 'BAD':
      const changedBadState = { 
        ...state
      }
      ++changedBadState.bad
      return changedBadState
    case 'ZERO':
      const changedZeroState = { 
        good: 0,
        ok: 0,
        bad: 0
      }
      return changedZeroState
    default: return state
  }
  
}

export default counterReducer