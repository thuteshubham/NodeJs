const express = require('express')
const mongoose = require('mongoose');
const shortid = require('short-id');
const response = require('./../libs/responseLib');
const timesNow=require('./../libs/timeLib')
const check =require('./../libs/checkLib')
const logger=require('./../libs/loggerLib');


//Importing the model here 
const BlogModel = mongoose.model('Blog')

let getAllBlog = (req, res) => {
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(`Error occured ${err}`,'Database',10);
                let apiResponse = response.generate(true, 'failed to find blog details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.error(`Error occured `,'Database',5);
                let apiResponse = response.generate(true, 'no blog found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All blogs found', 200, result)
                res.send(apiResponse);
            }
        })
}// end get all blogs

/**
 * function to read single blog.
 */
let viewByBlogId = (req, res) => {
    

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            logger.error(`Error occured ${err}`,'Database',5);
            let apiResponse = response.generate(true, 'failed to find blog details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            
            logger.error(`Error occured `,'Database',5);
            let apiResponse = response.generate(true, 'no blog found', 404, null)
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'blog found', 200, result)
            res.send(apiResponse);
        }
    })
}

/**
 * function to read blogs by category.
 */
let viewByCategory = (req, res) => {

    BlogModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            console.log(err)

            let apiResponse = response.generate(true, 'failed to find blog details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.error(`Error occured `,'Database',5);
            let apiResponse = response.generate(true, 'no blog found', 404, null)
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'blog found', 200, result)
            res.send(apiResponse);
        }
    })
}

/**
 * function to read blogs by author.
 */
let viewByAuthor = (req, res) => {

    BlogModel.find({ 'author': req.params.author }, (err, result) => {

        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'failed to find blog details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.error(`Error occured `,'Database',5);
            let apiResponse = response.generate(true, 'no blog found', 404, null)
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'blog found', 200, result)
            res.send(apiResponse);
        }
    })
}

/**
 * function to edit blog by admin.
 */
let editBlog = (req, res) => {

    let options = req.body;
    console.log(options);
    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'failed to find blog details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.error(`Error occured `,'Database',5);
            let apiResponse = response.generate(true, 'no blog found', 404, null)
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'blog found', 200, result)
            res.send(apiResponse);

        }
    })
}



/**
 * function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'failed to delete blog', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.error(`Error occured `,'Database',5);
            let apiResponse = response.generate(true, 'no blog found', 404, null)
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'blog found', 200, result)
            res.send(apiResponse);

        }
    })
}

/**
 * function to create the blog.
 */
let createBlog = (req, res) => {
    var today = timesNow.convertToLocalTime()
    let blogId = shortid.generate()

    let newBlog = new BlogModel({

        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: today,
        lastModified: today
    }) // end new blog model

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'failed to delete blog', 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'blog deleted', 200, result)
            res.send(apiResponse);
        }
    }) // end new blog save
}

/**
 * function to increase views of a blog.
 */
let increaseBlogView = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (check.isEmpty(result)) {
            logger.error(`Error occured `,'Database',5);
            res.send("No Blog Found")
        } else {

            result.views += 1;
            result.save(function (err, result) {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'failed to delete blog', 500, null)
                    res.send(apiResponse)
                }
                else {
                    console.log("Blog updated successfully")
                    let apiResponse = response.generate(false, 'blog found', 200, result)
                    res.send(apiResponse);    

                }
            });// end result

        }
    })
}




module.exports = {
    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView
}