"use server"

import { createWriteStream } from "fs"
import { InputCourse, InputModule, addCourse, addModuleDb, courseWithout, getAllCourses, updateCourseById } from "../api"
import { redirect } from "next/navigation"



export const handleAdd = async (prev: unknown,  data:FormData) => {
   const courses = getAllCourses()

   let currName = data.get('name') as string
   let currDuration =  +(data.get('duration') as string)
   let currPrice = +(data.get('price') as string)

   const inputPrice = (isNaN(currPrice) || currPrice == 0)? "" : currPrice
   const inputDuration = (isNaN(currDuration) || currDuration == 0)? "" : currDuration

   const found = courses.find(c=>c.name ===currName)
 
    if(!data.get('name') || !data.get('price') || !data.get('duration')){
      return {
         name:currName,
         price:inputPrice,
         duration:inputDuration,
         message:"Please fill all the fields"
      }
    }else if(found){
      return{
         name:currName,
         price:inputPrice,
         duration:inputDuration,
         message:"Please choose another name for the course"
      }
    } else if(isNaN(currPrice)){
      return{
         name:currName,
         price:null,
         duration:isNaN(currDuration)? null : currDuration,
         message:"price must be a number"
      }
   }  else  if(isNaN(currDuration)){
      return{
         name:currName,
         price:inputPrice,
         duration:"",
         message:"duration must be a number"
      }
    } 
   
     
 
   const photo = data.get('cover') as File
   if(photo){
     let extension = photo.type.split("/").at(-1)
     const filename =  Date.now() + "." + extension
    
     const stream = createWriteStream("public/images/" + filename)

     const bufferedImage = await photo.arrayBuffer()

     stream.write(Buffer.from(bufferedImage))


     let course:InputCourse = {
        name: data.get('name') as string,
        price: +(data.get('price') as string),
        duration: +(data.get('duration') as string),
        cover: 'images/' + filename
     }

     addCourse(course)
     redirect("/courses")

   }
}

export const handleUpdate = async (data:FormData) => {
  let course:courseWithout ={
   name: data.get('name') as string,
   price:+(data.get('price') as string),
   duration: +(data.get('duration') as string)
  }

  let id = +(data.get('id') as string)
  updateCourseById(id, course)
  redirect("/courses")

}

export const addModule = async (data:FormData)=>{
   let obj:InputModule ={
      name: data.get('name') as string,
      duration: +(data.get('duration') as string),
      courseId: +(data.get('courseId') as string)
   }
   let result = addModuleDb(obj)
  
   
   redirect('/courses')
}