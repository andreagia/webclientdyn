package org.cirmmp.webclientdyn.mds2.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


public class CustomUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    Logger logger = LoggerFactory.getLogger(CustomUsernamePasswordAuthenticationFilter.class);


    // ~ Constructors
    // ===================================================================================================

    public CustomUsernamePasswordAuthenticationFilter(){
        super();
     //   setPostOnly(false);
        setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/login", "GET"));
    }


}
