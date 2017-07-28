package org.cirmmp.webclientdyn.elfinder.impl;

import org.cirmmp.webclientdyn.elfinder.service.FsServiceConfig;

public class DefaultFsServiceConfig implements FsServiceConfig
{
	private int _tmbWidth;

	public void setTmbWidth(int tmbWidth)
	{
		_tmbWidth = tmbWidth;
	}

	@Override
	public int getTmbWidth()
	{
		return _tmbWidth;
	}
}
