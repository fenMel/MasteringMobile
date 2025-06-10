import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";
// @ts-ignore
import jwt_decode, {jwtDecode} from 'jwt-decode';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserRole} from "../constants/roles.enum"; // Ensure this import is present

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message?: string;
  token: string;
}

export interface JwtPayload {
  sub: string; // email de l'utilisateur
  roles: { authority: string }[];
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  currentUserSubject = new BehaviorSubject<JwtPayload | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router : Router) {
    // Check if user is already logged in
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
    }
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login_with_jwt`, credentials).pipe(
      tap(response => {
        console.log('Login response:', response);

        if (response.token) {
          localStorage.setItem('authToken', response.token);

          const decoded: JwtPayload = jwtDecode<JwtPayload>(response.token);
          console.log('Decoded JWT:', decoded);

          this.currentUserSubject.next(decoded);
          console.log(this.currentUserSubject.value?.sub)
        }
      }),
      catchError(this.handleError)

    );
  }



  // Other methods...

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  async redirectUserByRole() {
    const currentRole = this.getUserRole()
    if (!currentRole) {
      await this.router.navigate(['/login']);
      return;
    }
    const role : UserRole = currentRole as UserRole

    switch (role) {
      case UserRole.Coordinator:
        await this.router.navigate(['/coordinator-dashboard']);
        break;
      case UserRole.Candidat:
        await this.router.navigate(['/candidat-dashboard']);
        break;
      case UserRole.Jury:
        await this.router.navigate(['/jury-dashboard']);
        break;
      default:
        await this.router.navigate(['/login']); // fallback
        break;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }


  getCurrentUser(): JwtPayload | null {
    return this.currentUserSubject.value;
  }

  loadUserFromToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        this.currentUserSubject.next(decoded);
      } catch (error) {
        console.error('Failed to decode token:', error);
        this.currentUserSubject.next(null);
      }
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getStoredUser(): any {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  getUserRole(): string | null {
    const user = this.currentUserSubject.value;
    return user?.roles[0]?.authority ?? null;
  }

  getUserEmail(): string | null {
    return this.currentUserSubject.value?.sub ?? null;
  }


  geCurrentUserDBInfo (): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>(`${this.API_URL}/users/email/${this.getUserEmail()}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
    } else {
      // Server-side error
      console.log('Erreur connexion:', error.message);


      switch (error.status) {
        case 401:
          errorMessage = 'Email ou mot de passe incorrect';
          break;
        case 403:
          errorMessage = 'Vous n\'avez pas les droits d\'accès. Veuillez contacter votre administrateur si vous avez été inscrit';
          break;
        case 404:
          errorMessage = 'Service non disponible';
          break;
        case 500:
          errorMessage = 'Erreur serveur, veuillez réessayer';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${error.message}`;
      }
    }

    return throwError(() => errorMessage);
  }
}
