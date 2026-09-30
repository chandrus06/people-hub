import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  teams = [
    {
      name: 'React Native Core Team',
      members: ['Ashwin Sanjay – Lead', 'Karthikeyan', 'Siva Kumar', 'Kalimuthu']
    },
    {
      name: 'Python Core Team',
      members: ['R. Ajay – Lead', 'Shibu', 'Balachandran', 'Sri Harish Balaji']
    },
    {
      name: 'Vue JS Core Team',
      members: ['Karthikeyan – Lead', 'Pandi', 'Ajay Murugan', 'Shanthoshini']
    },
    {
      name: 'Node JS Core Team',
      members: ['Kalaiyarasan – Lead', 'Prathap', 'Amal Raj', 'Bhaseerah']
    },
    {
      name: 'Service Portal Core Team',
      members: ['Devajohnson – Lead', 'Sugapriya', 'Nitheshkumar', 'Ajay Xavier']
    },
    {
      name: 'ServiceNow Core Team',
      members: ['Delphin – Lead', 'Sarguna', 'Santhosh', 'Manoj', 'Bala Ganeshan', 'Vaitheeswari', 'Hariprasad']
    },
    {
      name: 'Java Core Team',
      members: ['Vignesh – Lead', 'Mukesh', 'Ramkumar', 'Salamon', 'Ashwin', 'Ajay Murugan', 'Karthikeyan']
    },
    {
      name: 'React Core Team',
      members: ['Jothimaniyan – Lead', 'Manigandan', 'Venkateshwaran', 'Geethan Kumar', 'Arriponnar']
    },
    {
      name: 'UI/UX Core Team',
      members: ['Mahalingam – Lead', 'Manikandan', 'Velmurugan', 'Hariram']
    },
    {
      name: 'Angular Core Team',
      members: ['Chandru S – Lead', 'Veeranagu', 'Pavithra', 'Venu Gopal']
    }
  ];

  getInitials(name: string): string {
    const parts = name.split(' ');
    let initials = parts[0][0];
    if (parts.length > 1 && parts[1] !== '–') {
      initials += parts[1][0];
    }
    return initials.toUpperCase();
  }
}
