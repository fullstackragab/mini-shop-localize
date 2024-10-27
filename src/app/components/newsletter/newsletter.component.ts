import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, InputTextModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
})
export class NewsletterComponent {}
