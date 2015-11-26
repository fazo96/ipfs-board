var React = require('react')
var Link = require('react-router').Link
var Icon = require('icon.jsx')

module.exports = function(boardsAPI){
  var UserID = require('userID.jsx')(boardsAPI)
  var GetIPFS = require('getipfs.jsx')(boardsAPI)
  var Post = require('post.jsx')(boardsAPI)
  var Comment = require('comment.jsx')(boardsAPI)

  return React.createClass({
    getInitialState: function(){
      return { parent: false, api: false }
    },
    componentDidMount: function(){
      boardsAPI.use(boards => {
        boards.init()
        boards.getEventEmitter().on('init', err => {
          if(!err && this.isMounted()){
            this.init(boards)
          }
        })
        if(this.isMounted() && boards.isInit){
          this.init(boards)
        }
      })
    },
    init: function(boards){
      if(this.state.init) return
      this.setState({ api: true })
      boards.downloadComment(this.props.params.commenthash,this.props.params.userid,this.props.params.boardname,(err,comment) => {
        if(err){
          this.setState({ comment: { title: 'Error', text: err.Message || err.Error }})
        } else {
          this.setState({ comment })
        }
      })
    },
    getContext: function(){
      if(this.props.params.userid){
        if(this.props.params.boardname)
          return <div>Comment by <UserID id={this.props.params.userid} /> in <Link to={'@'+this.props.params.userid+'/'+this.props.params.boardname}>#{this.props.params.boardname}</Link> to <Link to={'/@'+this.props.params.userid+'/'+this.props.params.boardname+'/'+this.props.params.posthash }>{this.props.params.posthash}</Link></div>
        else
          return <div>Comment by <UserID id={this.props.params.userid} /></div>
      } else return <div><h6 className="light">You are viewing a single comment</h6></div>
    },
    showComment: function(){
      if(this.state.comment){
        return <Comment comment={this.state.comment} post={this.props.params.posthash} adminID={this.props.params.userid} board={this.props.params.boardname} showParent={true} />
      } else {
        return <div className="center-block text-center">
          <Icon name="refresh" className="fa-3x center-block light fa-spin" />
          <h4>Finding content...</h4>
        </div>
      }
    },
    render: function(){
      if(this.state.api)
        return <div className="comment-page">
          <div className="text-center">
            {this.getContext()}
          </div>
          {this.showComment()}
        </div>
      else return <GetIPFS />
    }
  })
}
