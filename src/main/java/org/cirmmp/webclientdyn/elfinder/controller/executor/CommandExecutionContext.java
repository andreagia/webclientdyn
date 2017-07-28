package org.cirmmp.webclientdyn.elfinder.controller.executor;

import org.cirmmp.webclientdyn.elfinder.service.FsServiceFactory;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface CommandExecutionContext
{
	FsServiceFactory getFsServiceFactory();

	HttpServletRequest getRequest();

	HttpServletResponse getResponse();

	ServletContext getServletContext();
}
