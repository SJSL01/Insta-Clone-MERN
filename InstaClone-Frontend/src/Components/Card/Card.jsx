import like from './like.png'
import share from './share.png'
import "../../Styles/FeedCard.css"
const Card = ({ UserData }) => {

    return (
        <>
            {/* {UserData.map((data, idx) => { */}
                {/* return ( */}
                    <div className="card-Container border">

                        <div className='cardHead'>
                            <div>
                                <div className="Uname">sjsl</div>
                            </div>
                            <div className="more">...</div>
                        </div>

                        <div className="location">usa</div>

                        <div className='imgPOST'>
                            <img className='post_image' src="" alt="postImg" />
                        </div>

                        <div className='like_share_date'>

                            <div >
                                <img src={like} alt="like" style={{ marginRight: "10px" ,height:"32px",width:"32px"}} />
                                <img src={share} alt="share" />

                            </div>
                            <span>date</span>
                        </div>
                        <span className='like'>likes likes</span>
                        <div className='desc' style={{"fontSize":"20px"}} >descprition</div>
                    </div>
                {/* ) */}
            {/* })} */}
        </>
    )
}

export default Card;