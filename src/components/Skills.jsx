import styles from './Skills.module.css'

const skillGroups = {
  General: ['Java', 'JavaScript', 'Python', 'OOP'],
  Backend: ['Node.js', 'MySQL', 'MongoDB'],
  Frontend: ['React', 'React Native', 'HTML5', 'CSS', 'Figma'],
  'Soft Skills': ['Leadership', 'Group Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking'],
  'Other Skills': ['Gaming', 'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
}

function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <h2>Skills</h2>
      <div className={styles.grid}>
        {Object.entries(skillGroups).map(([group, items]) => (
          <article key={group} className={styles.group}>
            <h3>{group}</h3>
            <div className={styles.tags}>
              {items.map((item) => (
                <span key={item} className={styles.tag}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Skills
