import { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './spinner.js'

export class News extends Component{

        constructor(){
        super();
        this.state = {
             article: [],
             page: 1,
             pagesize: 10,
             loading: true,
             totalResults: 1, 
        }
    }
    
   async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d4e2c08630664ba48a7e11a787bf88cb&page=${this.state.page}&pagesize=${this.state.pagesize}`;
      let data = await (await fetch(url)).json();
      this.setState({
        article: data.articles,
        totalResults: data.totalResults,
        loading:false
      })

    }

    handlePreviousClick =  async () => {
       console.log("previousClick")
       this.setState({
        loading:true
    })
       let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d4e2c08630664ba48a7e11a787bf88cb&page=${this.state.page - 1}&pagesize=${this.state.pagesize}`;
       let data = await(await fetch(url)).json();
       if( Math.ceil(data.totalResults/this.state.pagesize) > this.state.page ){
        this.setState({
            article: data.articles,
            page: this.state.page - 1,
            loading:false
        })
       }
       
    }

    handleNextClick =  async () => {
        console.log("NextClick")
        this.setState({
            loading:true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d4e2c08630664ba48a7e11a787bf88cb&page=${this.state.page + 1}&pagesize=${this.state.pagesize}`;
        let data = await(await fetch(url)).json();
        if( Math.ceil(data.totalResults/this.state.pagesize) > this.state.page ){
         this.setState({
             article: data.articles,
             page: this.state.page + 1,
             loading:false
         })
        }
        
    }

    render() {
        return(
            <div className = "container my-3">
                <h1 className=" text-center">Free News Top Headlines</h1>
                     { this.state.loading && <Spinner/>}
                         <div className = "row">
                         {this.state.article.map((element)=> {
                             return <div className=  "col-md-4 my-3" key = {element.url}>
                             <NewsItem title = {element.title} description = {element.description} imageUrl = {element.urlToImage} url = {element.url} />
                             </div>  
                         })}
                             
                         </div>
               
                
                <div className="d-flex justify-content-around">
                        <button disabled = {this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>Previous Page</button>
                        <button disabled = {this.state.page >= Math.ceil(this.state.totalResults/this.state.pagesize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next Page</button>
                </div>

            </div>
        )
        }
}

export default News