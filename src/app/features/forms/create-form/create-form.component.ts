import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISection } from 'src/app/core/interfaces';

// Interfaces
// import { ISection } from 'src/app/core/interfaces';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {
  questionnaireForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.questionnaireForm = this.formBuilder.group({
      sections: this.formBuilder.array([this.createSection()]),
    });
  }

  private createSection(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      questions: this.formBuilder.array([this.createQuestion()]),
    });
  }

  private createQuestion(): FormGroup {
    return this.formBuilder.group({
      type: ['shortAnswer', Validators.required],
      question: ['', Validators.required],
      options: this.formBuilder.array([
        this.formBuilder.group({option: this.formBuilder.control(null)})
      ]), // Inicializamos con un control vacío
    });
  }

  get sections(): FormArray {
    return this.questionnaireForm.get('sections') as FormArray;
  }

  getQuestions(sectionIndex: number): FormArray {
    return this.sections.controls[sectionIndex].get('questions') as FormArray;
  }

  getOptions(questionIndex: number): FormArray {
    return this.getQuestions(0).controls[questionIndex].get('options') as FormArray;
  }

  addSection() {
    this.sections.push(this.createSection());
  }

  removeSection(sectionIndex: number) {
    this.sections.removeAt(sectionIndex);
  }

  addQuestion(sectionIndex: number) {
    const questionGroup = this.createQuestion();
    // const type = questionGroup.get('type')!.value;
    // if (type === 'options' || type === 'checkboxes') {
    //   // Si es una pregunta de opciones o casillas, inicializamos el FormArray con dos controles
    //   // questionGroup.get('options')!.patchValue(['', '']);
    //   // (questionGroup.get('options') as FormArray).push(this.formBuilder.control(null));
    // }
    this.getQuestions(sectionIndex).push(questionGroup);
  }

  removeQuestion(sectionIndex: number, questionIndex: number) {
    this.getQuestions(sectionIndex).removeAt(questionIndex);
  }

  addOption(questionIndex: number) {
    this.getOptions(questionIndex).push(
      this.formBuilder.group({option: this.formBuilder.control(null)})
    );
  }

  removeOption(questionIndex: number, optionIndex: number) {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  onSubmit() {    
    let presavedQuestionnaire = localStorage.getItem('questionnaire') ? JSON.parse(localStorage.getItem('questionnaire')!) as ISection[] : [];
    presavedQuestionnaire = presavedQuestionnaire.concat(this.questionnaireForm.value.sections);    
    localStorage.setItem('questionnaire', JSON.stringify(presavedQuestionnaire));
    this.router.navigate(['/form/overview']);
  }
}