export const config = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_PROD_API_URL
  }
  return process.env.REACT_APP_TEST_API_URL
}
