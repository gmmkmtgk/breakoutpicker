import MainCard from 'components/MainCard';
import { courses } from 'data/learn';

const Courses = () => {
  return (
    <MainCard>
      <div>
        <h1>Courses</h1>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </MainCard>
  );
};

export default Courses;

