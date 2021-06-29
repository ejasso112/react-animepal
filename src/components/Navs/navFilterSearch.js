// Import Styles
// import classes from './navFilter.module.scss'

const NavFilterSearch = (props) => {
  // Destructuring Props
  const { title } = { ...props }
  return (
    <div>
      <div>{title}</div>
      <div>
        <input />
        <svg></svg>
      </div>
    </div>
  )
}

export default NavFilterSearch
