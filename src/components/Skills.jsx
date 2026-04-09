import styles from './Skills.module.css'

const skillGroups = {
  Languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'],
  Frameworks: ['React', 'Vite', 'Node.js', 'Express'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma'],
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
