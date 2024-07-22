import Image from "next/image"
import { ICourse } from "../api"
import Link from "next/link"

interface IProps{
    courses:ICourse[]
}


export const CourseList =({courses}:IProps)=>{
    return <>
    <div className="columns">
        {
            courses.map(course =>{
                return <div key={course.id} className="column"> 
                <Image
                src={"/"+course.cover}
                width={200}
                height={200}
                alt="course photo"
                />
                    <p>{course.name}</p>
                    <p>for {course.duration} months</p>
                    <p>with {course.price} per month</p>
                    <ul className="my-6">
                        {
                            course.modules?.map(m=>
                                <li key={m.id}>{m.name}</li>)
                        }

                    </ul>
                    <Link href={"/courses/edit/"+ course.id}>Edit</Link>
                </div>
            })
        }
    </div>
    </>

}