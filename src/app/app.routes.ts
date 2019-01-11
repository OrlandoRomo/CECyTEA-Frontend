import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/shared/login/login.component';
import { CreateManagerComponent } from './components/create-manager/create-manager.component';
import { ListQuestionsComponent } from './components/list-questions/list-questions.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { ComponentIndexComponent } from './components/component-index.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
    {
        path: '', component: ComponentIndexComponent,
        children: [
            { path: 'questions', component: ListQuestionsComponent },
            { path: 'newquestion', component: QuestionComponent },
            { path: 'users', component: ListUsersComponent },
            { path: 'categories', component: ListCategoriesComponent },
        ]
    },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'newmanager', component: CreateManagerComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
    { path: '', pathMatch: 'full', redirectTo: 'home' }
];
export const APPROUTING = RouterModule.forRoot(routes, { useHash: true });
