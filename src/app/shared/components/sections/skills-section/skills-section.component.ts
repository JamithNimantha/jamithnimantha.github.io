import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-skills-section',
    imports: [
        NgForOf
    ],
    templateUrl: './skills-section.component.html',
    styleUrl: './skills-section.component.scss'
})
export class SkillsSectionComponent {
    skills = [
        {name: 'Java', icon: 'fab fa-java'},
        {name: 'Spring Framework', icon: 'fas fa-leaf'},
        {name: 'Spring Cloud', icon: 'fas fa-cloud'},
        {name: 'MongoDB', icon: 'fas fa-leaf'},
        {name: 'SQL', icon: 'fas fa-database'},
        {name: 'AWS', icon: 'fab fa-aws'},
        {name: 'OCI', icon: 'fas fa-cloud'},
        {name: 'Angular', icon: 'fab fa-angular'},
        {name: 'React', icon: 'fab fa-react'},
        {name: 'Docker', icon: 'fab fa-docker'},
        {name: 'HTML5', icon: 'fab fa-html5'},
        {name: 'CSS3', icon: 'fab fa-css3-alt'},
        {name: 'JavaScript', icon: 'fab fa-js'},
        {name: 'JavaFX', icon: 'fas fa-desktop'},
        {name: 'Git', icon: 'fab fa-git-alt'},
        {name: 'Oracle DB', icon: 'fas fa-database'},

    ];


}
