import { Link } from "react-router-dom";

export default function SectionSelector(props) {
    return (
    <Link to={`/${props.page}`}>
    <div className='container'>
        <div className='videoText'>
          <div className=''>
            <video src={props.video} autoPlay loop muted playsInline className="outline"/>
          </div>
          <div className='text'>
            <h1>{props.section}</h1>
          </div>
        </div>
    </div>
    </Link>
  )
}