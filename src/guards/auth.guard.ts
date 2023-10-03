import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/services/user.service';
export const authGuard: CanActivateFn = (route, state) => {
  const message = inject(MessageService)
  const router = inject(Router);
  if(UserService.isLoggedIn()){
    return true
  }
  else{
    router.navigateByUrl('login');
    message.add({ severity: 'error', summary: 'Please Login!', detail: "Login to continue .", sticky: true });
  }
  return false;
};
