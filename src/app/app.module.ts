import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/shared/login/login.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { HomeComponent } from './components/home/home.component';
import { CreateManagerComponent } from './components/create-manager/create-manager.component';
import { ListQuestionsComponent } from './components/list-questions/list-questions.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { ComponentIndexComponent } from './components/component-index.component';

// ReactiveFormsModule
import {ReactiveFormsModule} from '@angular/forms';
// Services
import { AuthService } from './services/auth.service';
// HttpModule
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/shared/footer/footer.component';
// Routes
import { APPROUTING } from './app.routes';
import { QuestionComponent } from './components/question/question.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LoadingComponent,
    FooterComponent,
    HomeComponent,
    CreateManagerComponent,
    ListQuestionsComponent,
    ListUsersComponent,
    ListCategoriesComponent,
    ComponentIndexComponent,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    APPROUTING
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
