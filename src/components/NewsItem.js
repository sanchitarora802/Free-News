import { Component } from "react"

export class NewsItem extends Component {
    render() {
        //getting the props from news module as props and destructering them to use it.
        let {title,description,imageUrl,url} = this.props
        return (
            <div>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">{title}..</h5>
                            <p className="card-text">{description}..</p>
                            <a href={url} target = "_blank" className="btn btn-sm btn-primary">Go somewhere</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem