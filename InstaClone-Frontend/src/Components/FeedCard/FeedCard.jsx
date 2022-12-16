import like from './like.png'
import share from './share.png'
import "../../Styles/FeedCard.css"
const FeedCard = ({ post }) => {

    return (

        <div className="card-Container border">

            <div className='cardHead'>
                <div>
                    <img style={{ height: "40px", width: "40px", display: "inline", borderRadius: "50%" }} src={post.avatar} alt="" />
                    <span className="Uname">{post.username}</span>
                </div>
                <div className="more">...</div>
            </div>

            {/* <div className="location">usa</div> */}

            <div className='imgPOST'>
                <img className='post_image' src={post.postImage} alt="postImg" />
            </div>

            <div className='like_share_date'>

                <div >
                    {/* <button> */}
                    <img src={like} alt="like" style={{ marginRight: "10px", height: "32px", width: "32px" }} />
                    {/* </button> */}
                    {/* <button> */}
                    <img src={share} alt="share" />
                    {/* </button> */}

                </div>
                <span>{post.date}</span>
            </div>
            <span className='like'>{Object.keys(post.likes).length} likes</span>
            <div className='desc' style={{ "fontSize": "20px" }} >{post.description}</div>
        </div>

    )
}

export default FeedCard;